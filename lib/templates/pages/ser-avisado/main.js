const citiesAndDistricts = {{citiesAndDistricts}};
const tenant = '{{tenant}}';
const urlBase = '{{urlBase}}';
const siteMode = '{{siteMode}}';

const formData = { tenant, criteria: {}, contact: {} };

const capitalizeLetter = (string, type) => {
  if (!string) {
    return;
  }
  const lowercaseWords = ['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas'];

  const strategy = {
    firstLetter: (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

    allFirstLetters: (str) =>
      str
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
          if (index > 0 && lowercaseWords.includes(word)) {
            return word;
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ')
  };

  return strategy[type](string);
};

function maskPhone(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, function (_, ddd, p1, p2) {
      return `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`;
    });
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, function (_, ddd, p1, p2) {
      return `(${ddd}) ${p1}${p2 ? "-" + p2 : ""}`;
    });
  }
  input.value = value;
}

function parsePhone(value) {
  if (!value) return "";
  return value.replace(/\D/g, "");
}

const buildOption = (value, select) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  select.appendChild(option);
};

const buildCheckboxOption = (value, container) => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = value;
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(value));
  container.appendChild(label);
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
  const optionDistricts = document.getElementById("options_districts");
  const selectedCity = citySelect.value;

  const citySelected = citiesAndDistricts.find((city) => city.name === selectedCity)
  if (citySelected) {
    optionDistricts.innerHTML = '';
    citySelected.districts.forEach(district => {
      buildCheckboxOption(district, optionDistricts);
    });
  }
}

const onDistrict = () => {
  const checkboxes = document.querySelectorAll('#options_districts input[type="checkbox"]');
  const trigger = document.getElementById('districts_select');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      trigger.textContent = selected.length > 0 ? selected.join(', ') : 'Selecione';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  function setBodyFullHeight() {
    const altura = window.innerHeight;
    document.body.style.minHeight = altura + "px";
  }

  window.addEventListener("load", setBodyFullHeight);
  window.addEventListener("resize", setBodyFullHeight);
  window.addEventListener("orientationchange", setBodyFullHeight);

  const campIntent = document.getElementById('camp_intent');
  if (siteMode !== 'both') {
    campIntent.style.display = 'none';
    const gambs = document.getElementById('gambs');
    gambs.style.display = 'block';
  }

  // Multiselect
  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelector('.options');

    trigger.addEventListener('click', () => {
      options.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!select.contains(e.target)) {
        options.classList.remove('open');
      }
    });
  });

  let currentStep = 1;

  const formStepOne = document.getElementById('form_step_one');
  const formStepTwo = document.getElementById('form_step_two');
  const formStepThree = document.getElementById('form_step_three');
  const currentStepElement = document.getElementById('current_step');

  formStepTwo.classList.add('form_disabled');
  formStepThree.classList.add('form_disabled');

  processStep = (next) => {
    if (next) {
      currentStep++;
    } else {
      currentStep--;
    }
    const steps = {
      1: () => {
        formStepOne.classList.remove('form_disabled');
        formStepTwo.classList.add('form_disabled');
        formStepThree.classList.add('form_disabled');
        currentStepElement.textContent = '1';
      },
      2: () => {
        const selectDistrictMode = document.querySelector('input[name="district_mode"]:checked');
        const intentValue = ['rent', 'sale'].includes(siteMode) ? siteMode : document.getElementById('intent').value;
        const selectTypeProperty = document.getElementById('type_property');
        const selectCity = document.getElementById('city');
        const districts = Array.from(document.querySelectorAll('#districts input[type="checkbox"]:checked')).map(cb => cb.value);
        if (!intentValue || !selectTypeProperty.value || !selectCity.value || districts.length === 0) {
          alert('Por favor, preencha todos os campos para continuar.');
          return;
        }
        formData.intent = intentValue;
        formData.criteria.property_type = selectTypeProperty.value;
        formData.criteria.city = selectCity.value;
        formData.criteria.districts = selectDistrictMode.value === 'select' ? districts : districtsOptions.filter(d => !districts.includes(d));
        formStepOne.classList.add('form_disabled');
        formStepTwo.classList.remove('form_disabled');
        formStepThree.classList.add('form_disabled');
        currentStepElement.textContent = '2';
      },
      3: () => {
        const price_range = document.getElementById('price_range').value;
        const accept_pets = document.getElementById('accept_pets').value;
        const rooms = document.getElementById('rooms').value;
        const garage = document.getElementById('garage_spaces').value;
        if (!price_range || !accept_pets || !rooms || !garage) {
          alert('Por favor, preencha todos os campos para continuar.');
          return;
        }
        formData.criteria.maxTotalMonthlyCosts = parseFloat(price_range);
        formData.criteria.required_accepts_pets = accept_pets === 'true';
        formData.criteria.rooms = parseInt(rooms);
        formData.criteria.garage_spaces = parseInt(garage);
        formStepOne.classList.add('form_disabled');
        formStepTwo.classList.add('form_disabled');
        formStepThree.classList.remove('form_disabled');
        currentStepElement.textContent = '3';
      }
    }
    steps[currentStep]();
  };

  save = async () => {
    const inputName = document.getElementById('name');
    const inputWhatsapp = document.getElementById('whatsapp');
    if (!inputName.value || !inputWhatsapp.value) {
      alert('Por favor, preencha todos os campos para cadastrar.');
      return;
    }
    formData.contact.name = capitalizeLetter(inputName.value, 'allFirstLetters');
    formData.contact.whatsapp = parsePhone(inputWhatsapp.value);
    const resCreatedDemand = await fetch(`${urlBase}/demand`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resCreatedDemand.ok) {
      alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    window.location.href = '/index.html';
  }
});