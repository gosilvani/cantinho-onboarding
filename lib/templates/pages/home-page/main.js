const siteMode = '{{siteMode}}';
const citiesOptions = {{citiesOptions}};

document.addEventListener('DOMContentLoaded', function () {
  function setBodyFullHeight() {
    const altura = window.innerHeight;
    document.body.style.minHeight = altura + "px";
  }

  window.addEventListener("load", setBodyFullHeight);
  window.addEventListener("resize", setBodyFullHeight);
  window.addEventListener("orientationchange", setBodyFullHeight);

  const selectCity = document.getElementById('selected_city');
  citiesOptions.forEach(city => {
    const option = document.createElement('option');
    option.value = city.value;
    option.textContent = city.label;
    selectCity.appendChild(option);
  });

  const buyBtn = document.querySelector('[data-action="buy"]');
  const rentBtn = document.querySelector('[data-action="rent"]');

  if (siteMode === 'sale') {
    buyBtn.style.display = 'flex';
  }

  if (siteMode === 'rent') {
    rentBtn.style.display = 'flex';
  }

  if (siteMode === 'both') {
    buyBtn.style.display = 'flex';
    rentBtn.style.display = 'flex';
  }

  const buyButton = document.querySelector('button[data-action="buy"]');
  const rentButton = document.querySelector('button[data-action="rent"]');
  const citySelect = document.getElementById('selected_city');

  function redirectTo(action) {
    const city = citySelect.value;
    if (!city) {
      alert("Por favor, selecione uma cidade.");
      return;
    }
    window.location.href = `/imoveis/${action}/${city}/index.html`;
  }

  if (buyButton) {
    buyButton.addEventListener('click', function () {
      redirectTo('venda');
    });
  }

  if (rentButton) {
    rentButton.addEventListener('click', function () {
      redirectTo('alugar');
    });
  }
});
