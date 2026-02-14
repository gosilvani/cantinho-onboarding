const urlBase = '{{urlBase}}';
const citiesAndDistricts = {{citiesAndDistricts}};
let token

const buildOption = (value, select) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  select.appendChild(option);
};

const buildCities = () => {
  const citySelect = document.getElementById("city");

  if (citySelect.options.length > 1) return;

  citiesAndDistricts.forEach((city) => {
    buildOption(city.name, citySelect)
  });
}

const handleCityChange = () => {
  const citySelect = document.getElementById("city");
  const districtSelect = document.getElementById("district");
  const selectedCity = citySelect.value;

  districtSelect.innerHTML = '<option disabled selected hidden>Selecione</option>';

  const citySelected = citiesAndDistricts.find((city) => city.name === selectedCity)
  if (citySelected) {
    citySelected.districts.forEach(district => {
      buildOption(district, districtSelect)
    });
  }
}

function formatCurrency(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  value = (Number(value) / 100).toFixed(2);

  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  input.value = 'R$ ' + parts.join(',');
}

const parseValue = (value) => value.replace(/\s|R\$\s?/g, '').replace(/\./g, '').replace(',', '.');

const getCookie = (name) => {
  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return value ? decodeURIComponent(value.split('=')[1]) : null;
}

const logout = () => {
  document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  window.location.href = '/login/index.html';
}

let demandCriterias;

const calculateReach = async () => {
  const city = document.getElementById("city").value;
  const district = document.getElementById("district").value;
  const type = document.getElementById('type').value;
  const accept_pets_input = document.getElementById('accept_pets').value;
  const rooms = document.querySelector('input[name="rooms"]:checked')?.value;
  const garage_spaces = document.querySelector('input[name="garage_spaces"]:checked')?.value;
  const value = parseValue(document.getElementById("value").value);

  if (!city || !district || !value || !type || !accept_pets_input || !rooms || !garage_spaces) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const formStep = document.getElementById('stepForm');
  const resultStep = document.getElementById('stepResult');
  const notifyStep = document.getElementById('stepNotify');

  demandCriterias = {
    intent: 'rent',
    city,
    district,
    rooms: parseInt(rooms),
    value: parseFloat(value),
    property_type: type,
    garage_spaces: parseInt(garage_spaces),
    accepts_pets: accept_pets_input === 'true',
  }
  
  const resCalculated = await fetch(`${urlBase}/demands?${new URLSearchParams(demandCriterias).toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (resCalculated.status === 401) {
    window.location.href = '/login/index.html';
    return;
  }

  if (!resCalculated.ok) {
    alert('Erro ao calcular o alcance. Por favor, tente novamente.');
    return;
  }

  const allClientesSpan = document.getElementById('all_clients');
  const ownClientesSpan = document.getElementById('own_clients');
  const marketplaceClientesSpan = document.getElementById('marketplace_clients');
  const response = await resCalculated.json();
  const { countTenant, countMarketplace } = response;
  allClientesSpan.textContent = countTenant + countMarketplace;
  ownClientesSpan.textContent = countTenant;
  marketplaceClientesSpan.textContent = countMarketplace;
  formStep.classList.add('hiddenStep');
  resultStep.classList.remove('hiddenStep');
  notifyStep.classList.remove('hiddenStep');
};

const notifyClients = async () => {
  const tenant_only = document.getElementById("tenant_only").value;
  const limit = document.getElementById("limit").value;

  if (!tenant_only || !limit) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  demandCriterias.tenant_only = tenant_only === 'true';
  demandCriterias.limit = parseInt(limit);

  const resNotify = await fetch(`${urlBase}/demands/notify`, {
    method: 'POST',
    body: JSON.stringify(demandCriterias),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (resNotify.status === 401) {
    window.location.href = '/login/index.html';
    return;
  }

  if (!resNotify.ok) {
    alert('Erro ao enviar a notificação. Por favor, tente novamente.');
    return;
  }  
  alert('Recebemos sua solicitação e enviaremos as notificações!');
  window.location.href = '/administrativo/imoveis/alugar/calcular-alcance/index.html';
}

const returnStep = () => {
  const formStep = document.getElementById('stepForm');
  const resultStep = document.getElementById('stepResult');
  const notifyStep = document.getElementById('stepNotify');

  formStep.classList.remove('hiddenStep');
  resultStep.classList.add('hiddenStep');
  notifyStep.classList.add('hiddenStep');
}


document.addEventListener('DOMContentLoaded', () => {
  function setBodyFullHeight() {
    const altura = window.innerHeight;
    document.body.style.minHeight = altura + "px";
  }

  window.addEventListener("load", setBodyFullHeight);
  window.addEventListener("resize", setBodyFullHeight);
  window.addEventListener("orientationchange", setBodyFullHeight);

  const user_name = getCookie('user_name');
  token = getCookie('token');
  if (!user_name || !token) {
    window.location.href = '/login/index.html';
    return;
  }
  const userNameElement = document.getElementById('user_name');
  userNameElement.textContent = user_name;
});