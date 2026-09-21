const properties = [];
const districtsOptions = {{districtsOptions}};
const citiesOptions = {{citiesOptions}};
const isMarketplace = {{isMarketplace}};
const tenant = '{{tenant}}';
const urlBase = '{{urlBase}}';
const actualCity = {{city}};
const contactOptions = {{contactOptions}};

const iconArrowLeftClean = `{{iconArrowLeftClean}}`;
const iconArrowRightClean = `{{iconArrowRightClean}}`;
const iconHome = `{{iconHome}}`;
const iconDetail = `{{iconDetail}}`
const iconOwner = `{{iconOwner}}`
const iconWhatsapp = `{{iconWhatsapp}}`
const iconArrowLeft = `{{iconArrowLeft}}`
const iconSearsh = `{{iconSearch}}`
const iconAccept = `{{iconAccepets}}`;
const iconNotAccept = `{{iconNotAccepets}}`;
const iconArea = `{{iconArea}}`;

let propertiesResult = [];

let BATCH_SIZE = 10;
let isProcessingInsertProperties = false;
let filtered = false;
let currentShowPropertyIndex = 30;
let propertyTypeSelected;

const dataDemand = {
  tenant,
  intent: 'rent',
  criteria: {
    city: actualCity,
    districts: districtsOptions,
    rooms: 0,
    garageSpaces: 0,
    requiredAccepetsPets: false
  },
  contact: {}
}

let processRequest = false;

const validateProcessRequest = (moment) => {
  const dialogLoading = document.getElementById('loading');

  const strategyProcess = {
    initial: () => {
      processRequest = true;
      dialogLoading.showModal();
    },
    finish: () => {
      processRequest = false;
      dialogLoading.close();
    }
  }
  return strategyProcess[moment]();
}

const formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 11) {
    return digits.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  }

  if (digits.length === 10) {
    return digits.replace(
      /(\d{2})(\d{4})(\d{4})/,
      '($1) $2-$3'
    );
  }

  return phone;
}

const openDirectContact = (number) => {
  const urlWhatsappRedirect = `https://wa.me/55${number}`;
  window.open(urlWhatsappRedirect, '_blank', 'noopener,noreferrer');
};

const processContact = () => {
  if (contactOptions.length === 1) {
    const [contact] = contactOptions;
    return openDirectContact(contact.number);
  }
  const contactDialogList = document.getElementById('contact_dialog_list');
  contactDialogList.innerHTML = '';

  contactOptions.forEach((contact) => {
    const contactItem = contact.hasWhatsapp ? document.createElement('a') : document.createElement('div');
    contactItem.className = 'contact_dialog_item';
    if (contact.hasWhatsapp) {
      contactItem.href = `https://wa.me/55${contact.number}`;
      contactItem.target = '_blank';
      contactItem.rel = 'noopener noreferrer';
    }

    const title = document.createElement('strong');
    title.textContent = contact.label;

    const phone = document.createElement('span');
    phone.textContent = formatPhone(contact.number);

    contactItem.appendChild(title);
    contactItem.appendChild(phone);
    contactDialogList.appendChild(contactItem);
  });

  const contactDialog = document.getElementById('contact_dialog');
  contactDialog.showModal();
}

const maskPhone = (input) => {
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

const parsePhone = (value) => {
  if (!value) return "";
  return value.replace(/\D/g, "");
}

const capitalizeLetter = (string, type) => {
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


const commercialTypes = ['Sala', 'Loja', 'Galpão'];

const createOption = ({ value, label, disabled = false, selected = false, hidden = false }) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  option.disabled = disabled;
  option.selected = selected;
  option.hidden = hidden;
  return option;
};

const resetSelectOptions = (select, options) => {
  select.replaceChildren(
    createOption({
      value: '',
      label: 'Selecione',
      disabled: true,
      selected: true,
      hidden: true
    }),
    ...options.map(({ value, label }) =>
      createOption({ value, label })
    )
  );

  select.disabled = false;
};

const lockSelectAsNotApplicable = (select) => {
  select.replaceChildren(
    createOption({
      value: '0',
      label: 'Não aplicável',
      selected: true
    })
  );

  select.value = '0';
  select.disabled = true;
};

const configurePropertyTypeFilters = () => {
  const roomsSelect = document.getElementById('rooms');
  const garageSpacesSelect = document.getElementById('garage_spaces');
  const acceptPetsSelect = document.getElementById('required_accepts_pets');

  const isCommercial = commercialTypes.includes(propertyTypeSelected);

  resetSelectOptions(garageSpacesSelect, [
    { value: '0', label: 'Tanto faz' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '+4' }
  ]);

  if (isCommercial) {
    lockSelectAsNotApplicable(roomsSelect);
    lockSelectAsNotApplicable(acceptPetsSelect);
    return;
  }

  if (propertyTypeSelected === 'Lote') {
    lockSelectAsNotApplicable(roomsSelect);
    lockSelectAsNotApplicable(garageSpacesSelect);
    lockSelectAsNotApplicable(acceptPetsSelect);
    return;
  }

  resetSelectOptions(roomsSelect, [
    { value: '0', label: 'Tanto faz' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '+4' }
  ]);
};

const handleCityChange = (event) => {
  const citySelected = event.value;
  const propertyType = propertyTypeSelected
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
  const targetPath = `/imoveis/alugar/${citySelected}/${propertyType}/index.html`;

  if (window.location.pathname === targetPath) return;

  window.location.href = targetPath;
};

const openFiltersDialog = () => {
  configurePropertyTypeFilters();
  document.getElementById('filters_dialog').showModal();
};

const handlePropertyTypeSearchChange = (event) => {
  const propertyTypeInputSelected = event.value;
  if (propertyTypeSelected === propertyTypeInputSelected) return;
  const redirectUrl = new URL(window.location.href);
  const segments = redirectUrl.pathname.split('/');
  segments[segments.length - 2] = propertyTypeInputSelected
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
  redirectUrl.pathname = segments.join('/');
  window.location.href = redirectUrl.href;
};

const getBuildImage = (targetImage, propertyData, tenant) => propertyData.tenant === tenant
  ? targetImage
  : `${propertyData.responsible.site}${targetImage}`;

const getImageObjectPosition = (property, index) =>
  property.images?.display?.[index]?.objectPosition || '50% 50%';

const setCarouselImage = (imgElement, property, imageIndex) => {
  const nextSrc = getBuildImage(property.images.urls[imageIndex], property, tenant);
  const nextObjectPosition = getImageObjectPosition(property, imageIndex);

  imgElement.src = nextSrc;
  imgElement.style.objectPosition = nextObjectPosition;
};

const syncCarouselImage = (imgElement, property, imageIndex) => {
  const nextSrc = getBuildImage(property.images.urls[imageIndex], property, tenant);
  const nextObjectPosition = getImageObjectPosition(property, imageIndex);

  if (imgElement.src === nextSrc) {
    imgElement.style.objectPosition = nextObjectPosition;
    return;
  }

  const preloadImage = new Image();
  imgElement.dataset.pendingImage = nextSrc;

  preloadImage.onload = () => {
    if (imgElement.dataset.pendingImage !== nextSrc) return;
    imgElement.src = nextSrc;
    imgElement.style.objectPosition = nextObjectPosition;
    delete imgElement.dataset.pendingImage;
  };

  preloadImage.onerror = () => {
    if (imgElement.dataset.pendingImage !== nextSrc) return;
    imgElement.src = nextSrc;
    imgElement.style.objectPosition = nextObjectPosition;
    delete imgElement.dataset.pendingImage;
  };

  preloadImage.src = nextSrc;
};

const closePopup = (propertyIdentifier, isDirect = false) => {
  const dialog = document.getElementById('property_detail');
  dialog.close();
  const divPropertyContent = document.getElementById('property_content');
  divPropertyContent.innerHTML = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  if (isDirect) {
    const url = new URL(window.location);
    url.searchParams.delete('id');
    window.history.replaceState({}, document.title, url);
    return;
  } else {
    const property = properties.find(p => p.identifier === propertyIdentifier);
    if (!property) return;
    property.images.currentImage = 0;
    const container = filtered ? 'item_result' : 'item';
    const ad = document.querySelector(`#${container} > [data-id="${propertyIdentifier}"]`);
    const imgProperty = ad.querySelector('figure img');
    setCarouselImage(imgProperty, property, property.images.currentImage);
    const buttonPrev = ad.querySelector('.btn_prev');
    buttonPrev.style.display = 'none';
    const buttonNext = ad.querySelector('.btn_next');
    buttonNext.style.display = 'block';

  }
};

const buildComponentProperty = (property) => {
  property.images.currentImage = 0;
  const ad = document.createElement('article');
  ad.classList.add('ad');
  ad.dataset.id = property.identifier;
  if (isMarketplace) {
    ad.dataset.tenant = property.tenant;
  }
  const figure = document.createElement('figure');
  figure.classList.add('carrosel');
  const imgProperty = document.createElement('img');
  imgProperty.classList.add('img_carousel');
  setCarouselImage(imgProperty, property, property.images.currentImage);
  imgProperty.alt = 'Imagem do imóvel';
  imgProperty.loading = 'lazy';
  figure.appendChild(imgProperty);
  const buttonPrev = document.createElement('button');
  buttonPrev.classList.add('btn_prev');
  buttonPrev.insertAdjacentHTML('beforeend', iconArrowLeftClean);
  const buttonNext = document.createElement('button');
  buttonNext.classList.add('btn_next');
  buttonNext.insertAdjacentHTML('beforeend', iconArrowRightClean);
  figure.appendChild(buttonPrev);
  figure.appendChild(buttonNext);
  ad.appendChild(figure);
  const divContent = document.createElement('div');
  divContent.classList.add('content');
  const titleValue = document.createElement('h3');
  titleValue.textContent = `R$ ${property.billings.totalMonthlyCosts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês`;
  divContent.appendChild(titleValue);
  const divType = document.createElement('div');
  divType.classList.add('type');
  const spanTitleType = document.createElement('span');
  spanTitleType.textContent = property.details.type;
  divType.insertAdjacentHTML('afterbegin', iconHome);
  divType.appendChild(spanTitleType);
  divContent.appendChild(divType);

  if (property.details.rooms || property.details.garageSpaces) {
    const divDetails = document.createElement('div');
    divDetails.classList.add('details');
    divDetails.insertAdjacentHTML('afterbegin', iconDetail);
    const listDetails = document.createElement('ul');
    if (property.details.rooms) {
      const itemInfoRooms = document.createElement('li');
      itemInfoRooms.textContent = `${property.details.rooms === 4 ? '+4' : property.details.rooms} quarto${property.details.rooms > 1 ? 's' : ''}`;
      listDetails.appendChild(itemInfoRooms);
    }
    if (property.details.garageSpaces) {
      const itemGarage = document.createElement('li');
      itemGarage.textContent = `${property.details.garageSpaces === 4 ? '+4' : property.details.garageSpaces} garage${property.details.garageSpaces > 1 ? 'ns' : 'm'}`;
      listDetails.appendChild(itemGarage);
    }
    divDetails.appendChild(listDetails);
    divContent.appendChild(divDetails);
  }

  const addressProperty = document.createElement('address');
  addressProperty.textContent = `${capitalizeLetter(property.address.street, 'allFirstLetters')}, ${property.address.number}${property.address.complement ? `, ${capitalizeLetter(property.address.complement, 'allFirstLetters')}` : ''}, ${capitalizeLetter(property.address.district, 'allFirstLetters')}, ${property.address.city}`;
  divContent.appendChild(addressProperty);
  ad.appendChild(divContent);
  return ad;
};

const processResults = () => {
  if (currentShowPropertyIndex >= propertiesResult.length || isProcessingInsertProperties) return;
  isProcessingInsertProperties = true;
  requestAnimationFrame(() => {
    const batch = propertiesResult.slice(currentShowPropertyIndex, currentShowPropertyIndex + BATCH_SIZE);
    const fragment = document.createDocumentFragment();
    for (const property of batch) {
      const ad = buildComponentProperty(property);
      fragment.appendChild(ad);
    };
    const container = filtered ? 'item_result' : 'item';
    const containerItemResult = document.getElementById(container);
    containerItemResult.appendChild(fragment);
    currentShowPropertyIndex += BATCH_SIZE;
    isProcessingInsertProperties = false;
  });
}

const openPopup = (propertyIdentifier, isDirect) => {
  const property = properties.find(p => p.identifier === propertyIdentifier);
  if (!property) return;
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollBarWidth + 'px';
  const dialog = document.getElementById('property_detail');
  dialog.showModal();
  const divPropertyContent = document.getElementById('property_content');
  divPropertyContent.dataset.propertyId = property.identifier;
  if (isMarketplace) {
    divPropertyContent.dataset.tenant = property.tenant;
  }
  const figure = document.createElement('figure');
  figure.classList.add('carrosel');

  const imgFigure = document.createElement('img');
  imgFigure.classList.add('img_carousel');
  if (!property.images.currentImage) {
    property.images.currentImage = 0;
  }
  setCarouselImage(imgFigure, property, property.images.currentImage);
  imgFigure.alt = 'Imagem do imóvel';
  const buttonPrev = document.createElement('button');
  buttonPrev.classList.add('btn_prev');
  buttonPrev.style.display = property.images.currentImage === 0 ? 'none' : 'block';
  buttonPrev.addEventListener('click', () => navigateCarousel(propertyIdentifier, 'prev', 'popup'));
  buttonPrev.insertAdjacentHTML('beforeend', iconArrowLeftClean);

  const buttonNext = document.createElement('button');
  buttonNext.classList.add('btn_next');
  buttonNext.style.display = property.images.currentImage === property.images.totalImages - 1 ? 'none' : 'block';
  buttonNext.addEventListener('click', () => navigateCarousel(propertyIdentifier, 'next', 'popup'));
  buttonNext.insertAdjacentHTML('beforeend', iconArrowRightClean);
  figure.appendChild(imgFigure);
  figure.appendChild(buttonPrev);
  figure.appendChild(buttonNext);

  divPropertyContent.appendChild(figure);

  const divPropertyInfos = document.createElement('div');
  divPropertyInfos.classList.add('property_infos');

  const divDetails = document.createElement('div');
  divDetails.classList.add('details');

  const divTypeProperty = document.createElement('div');
  divTypeProperty.id = 'type_property';

  const titleProperty = document.createElement('h2');
  titleProperty.textContent = `${property.details.type} para alugar`;
  divTypeProperty.insertAdjacentHTML('afterbegin', iconHome);

  divTypeProperty.appendChild(titleProperty);

  divDetails.appendChild(divTypeProperty);

  if (property.details.rooms || property.details.garageSpaces || property.details.bathrooms) {
    const divInfos = document.createElement('div');
    divInfos.id = 'infos';
    divInfos.insertAdjacentHTML('afterbegin', iconDetail);
    const divInfosDetails = document.createElement('div');
    if (property.details.rooms) {
      const itemRooms = document.createElement('span');
      itemRooms.textContent = `${property.details.rooms === 4 ? '+4' : property.details.rooms} quarto${property.details.rooms > 1 ? 's' : ''}`;
      divInfosDetails.appendChild(itemRooms);
    }
    if (property.details.bathrooms) {
      const itemBathrooms = document.createElement('span');
      itemBathrooms.textContent = `${property.details.bathrooms === 4 ? '+4' : property.details.bathrooms} banheiro${property.details.bathrooms > 1 ? 's' : ''}`;
      divInfosDetails.appendChild(itemBathrooms);
    }
    if (property.details.garageSpaces) {
      const itemGarage = document.createElement('span');
      itemGarage.textContent = `${property.details.garageSpaces === 4 ? '+4' : property.details.garageSpaces} garage${property.details.garageSpaces > 1 ? 'ns' : 'm'}`;
      divInfosDetails.appendChild(itemGarage);
    }
    divInfos.appendChild(divInfosDetails);
    divDetails.appendChild(divInfos);
  }


  const specialTypes = ['Sala', 'Loja', 'Galpão', 'Lote'];
  if (!specialTypes.includes(property.details.type)) {
    const divInfoPet = document.createElement('div');
    divInfoPet.classList.add('info_pet');
    const spanPet = document.createElement('span');
    spanPet.textContent = property.details.accepetsPets ? 'Aceita pets' : 'Pets não pertmitidos';
    divInfoPet.insertAdjacentHTML('afterbegin', property.details.accepetsPets ? iconAccept : iconNotAccept);
    divInfoPet.appendChild(spanPet);

    divDetails.appendChild(divInfoPet);
  }

  if (property.details.area) {
    const divInfoArea = document.createElement('div');
    divInfoArea.classList.add('info_area');
    const spanArea = document.createElement('span');
    spanArea.textContent = `${property.details.area.value} ${property.details.area.unit}`;
    divInfoArea.insertAdjacentHTML('afterbegin', iconArea);
    divInfoArea.appendChild(spanArea);

    divDetails.appendChild(divInfoArea);
  }

  if (property.details.description) {
    const divDescription = document.createElement('div');
    divDescription.classList.add('description');
    const titleDescriptionTitle = document.createElement('h3');
    titleDescriptionTitle.textContent = 'Descrição';
    const pDescription = document.createElement('p');
    pDescription.textContent = property.details.description.replace(/\n+/g, '\n');
    divDescription.appendChild(titleDescriptionTitle);
    divDescription.appendChild(pDescription);
    divDetails.appendChild(divDescription);
  }

  const address = document.createElement('address');
  address.textContent = `${capitalizeLetter(property.address.street, 'allFirstLetters')}, ${property.address.number}${property.address.complement ? `, ${capitalizeLetter(property.address.complement, 'allFirstLetters')}` : ''}, ${capitalizeLetter(property.address.district, 'allFirstLetters')}, ${property.address.city}`;

  divDetails.appendChild(address);

  divPropertyInfos.appendChild(divDetails);

  const divValues = document.createElement('div');
  divValues.classList.add('values');

  if (property.billings.costs.length === 1) {
    const divRentPrice = document.createElement('div');
    const strongTitleRentPrice = document.createElement('strong');
    strongTitleRentPrice.textContent = 'Aluguel';
    const strongValueRentPrice = document.createElement('strong');
    strongValueRentPrice.textContent = `R$ ${property.billings.totalMonthlyCosts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês`;
    divRentPrice.appendChild(strongTitleRentPrice);
    divRentPrice.appendChild(strongValueRentPrice);
    divValues.appendChild(divRentPrice);
  } else {
    const monthlyCosts = property.billings.costs.filter(cost => cost.frequency === 'Mensal');
    const otherCosts = property.billings.costs.filter(cost => cost.frequency !== 'Mensal');

    const processCosts = (cost, contentValues) => {
      const divValue = document.createElement('div');
      const spanTitleCost = document.createElement('span');
      spanTitleCost.textContent = cost.name;
      const spanValueCost = document.createElement('span');
      spanValueCost.textContent = `R$ ${cost.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / ${cost.frequency.toLocaleLowerCase()}`;
      divValue.appendChild(spanTitleCost);
      divValue.appendChild(spanValueCost);
      contentValues.appendChild(divValue);
    };

    monthlyCosts?.forEach(cost => processCosts(cost, divValues));

    const divRentPrice = document.createElement('div');
    const strongTitleRentPrice = document.createElement('strong');
    strongTitleRentPrice.textContent = 'Total mensal';
    const strongValueRentPrice = document.createElement('strong');
    strongValueRentPrice.textContent = `R$ ${property.billings.totalMonthlyCosts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês`;
    divRentPrice.appendChild(strongTitleRentPrice);
    divRentPrice.appendChild(strongValueRentPrice);

    divValues.appendChild(divRentPrice);

    otherCosts.forEach(cost => processCosts(cost, divValues));
  }

  divPropertyInfos.appendChild(divValues);

  const buildResponsible = (propertyResponsible, contentProperty) => {
    const { advertiser, logo } = propertyResponsible;
    const defineContentResponsible = logo ? 'company' : 'owner';
    const strategyFunction = {
      company: () => {
        const divResponsibleCompany = document.createElement('div');
        divResponsibleCompany.classList.add('responsible_company');
        const divContentImage = document.createElement('div');
        const imgLogoCompany = document.createElement('img');
        imgLogoCompany.src = logo;
        imgLogoCompany.alt = advertiser;
        divContentImage.appendChild(imgLogoCompany);
        divResponsibleCompany.appendChild(divContentImage);
        contentProperty.appendChild(divResponsibleCompany);
      },
      owner: () => {
        const divResponsibleOwner = document.createElement('div');
        divResponsibleOwner.classList.add('responsible_owner');
        const spanNameOwner = document.createElement('span');
        spanNameOwner.textContent = advertiser;
        spanNameOwner.insertAdjacentHTML('afterbegin', iconOwner);
        divResponsibleOwner.appendChild(spanNameOwner);
        contentProperty.appendChild(divResponsibleOwner);
      }
    };
    strategyFunction[defineContentResponsible]();
  };

  if (isMarketplace) {
    buildResponsible(property.responsible, divPropertyInfos);
  }

  if (property.responsible?.creci?.length) {
    const creciContent = document.createElement('div');
    creciContent.id = 'creci';
    const title = document.createElement('h3');
    title.textContent = property.responsible.creci.length > 1 ? 'CRECIs responsáveis' : 'CRECI responsável';
    const creciList = document.createElement('div');
    property.responsible.creci.forEach(creci => {
      const creciItem = document.createElement('div');
      creciItem.innerHTML = `<div><strong>${creci.label}</strong><p>CRECI ${creci.number}</p></div>`;
      creciList.appendChild(creciItem);
    });
    creciContent.appendChild(title);
    creciContent.appendChild(creciList);
    divPropertyInfos.appendChild(creciContent);
  }

  const divActions = document.createElement('div');
  divActions.classList.add('actions');

  const linkContact = document.createElement('a');
  linkContact.id = 'contact';
  linkContact.dataset.id = property.identifier;
  if (isMarketplace) {
    linkContact.dataset.tenant = property.tenant;
  }
  const spanContact = document.createElement('span');
  spanContact.textContent = 'Entrar em contato';
  const message = `Olá, gostaria de mais informações sobre o imóvel: ${window.location.origin}${window.location.pathname}?id=${property.identifier}`;
  const contact = property.responsible.contacts.length > 1
    ? property.responsible.contacts[Math.floor(Math.random() * property.responsible.contacts.length)]
    : property.responsible.contacts[0];
  linkContact.href = `https://api.whatsapp.com/send?phone=55${contact}&text=${encodeURIComponent(message)}`;
  linkContact.target = '_blank';
  linkContact.insertAdjacentHTML('afterbegin', iconWhatsapp);
  linkContact.appendChild(spanContact);
  divActions.appendChild(linkContact);

  const footerActions = document.createElement('div');
  footerActions.classList.add('footer_actions');

  if (!isDirect) {
    const buttonClose = document.createElement('button');
    const spanButton = document.createElement('span');
    spanButton.textContent = 'Voltar';
    buttonClose.insertAdjacentHTML('afterbegin', iconArrowLeft);
    buttonClose.appendChild(spanButton);
    buttonClose.addEventListener('click', () => closePopup(propertyIdentifier));

    footerActions.appendChild(buttonClose);
  } else {
    const buttonClose = document.createElement('button');
    const spanButton = document.createElement('span');
    spanButton.textContent = 'Buscar outros imóveis';
    buttonClose.insertAdjacentHTML('afterbegin', iconSearsh);
    buttonClose.appendChild(spanButton);
    buttonClose.addEventListener('click', () => closePopup(propertyIdentifier, true));

    footerActions.appendChild(buttonClose);
  }

  divActions.appendChild(footerActions);
  divPropertyInfos.appendChild(divActions);

  divPropertyContent.appendChild(divPropertyInfos);
};

const closeDialog = (dialogId) => {
  const dialog = document.getElementById(dialogId);
  dialog.close();
}

const navigateCarousel = (propertyIdentifier, operation, context) => {
  const property = properties.find(p => p.identifier === propertyIdentifier);
  if (!property) return;
  const containerSelectorStrategy = {
    article: () => {
      const container = filtered ? 'item_result' : 'item';
      return document.querySelector(`#${container} > [data-id="${propertyIdentifier}"]`)
    },
    popup: () => document.querySelector('.property_content')
  }
  const targetContainer = containerSelectorStrategy[context]();
  const buttonPrev = targetContainer.querySelector('.btn_prev');
  const buttonNext = targetContainer.querySelector('.btn_next');
  if (!property.images.currentImage) {
    property.images.currentImage = 0
  }
  const navigationStrategy = {
    next: () => {
      if ((property.images.currentImage + 1) === property.images.totalImages) {
        return true;
      }
      if ((property.images.currentImage + 2) === property.images.totalImages) {
        buttonNext.style.display = 'none';
      }
      property.images.currentImage++
      buttonPrev.style.display = 'block';
      if (context === 'article' && property.images.currentImage >= 3) {
        openPopup(propertyIdentifier);
        return true;
      }
    },
    prev: () => {
      if (!property.images.currentImage) {
        return true;
      }
      if ((property.images.currentImage - 1) === 0) {
        buttonPrev.style.display = 'none';
      }
      buttonNext.style.display = 'block';
      property.images.currentImage--;
    }
  }
  const notChangeImage = navigationStrategy[operation]();
  if (notChangeImage) {
    return;
  }

  const imgProperty = targetContainer.querySelector('figure .img_carousel');
  syncCarouselImage(imgProperty, property, property.images.currentImage);
}

const processRegistDemand = async (context) => {
  if (processRequest) return;
  validateProcessRequest('initial');
  const name = capitalizeLetter(document.getElementById(`name_${context}`).value, 'allFirstLetters');
  const whatsapp = document.getElementById(`whatsapp_${context}`).value;
  const value = parseFloat(document.getElementById(`value_range_${context}`).value);

  if (!name || !whatsapp || !value) {
    validateProcessRequest('finish');
    alert('Por favor, preencha todos os campos para registrar sua demanda de busca.');
    return;
  }

  dataDemand.contact.name = name;
  dataDemand.contact.whatsapp = parsePhone(whatsapp);
  dataDemand.criteria.value = value;

  const registerDemand = await fetch(`${urlBase}/demands`, {
    method: 'POST',
    body: JSON.stringify(dataDemand),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  validateProcessRequest('finish');
  if (!registerDemand.ok) {
    alert('Ocorreu um erro ao registrar sua demanda. Por favor, tente novamente mais tarde.');
    return window.location.href = '/';
  }
  alert('Cadastro realizado com sucesso! Avisaremos você quando surgirem novos imóveis disponíveis.');
  cleanFilters();
  const dialog = document.getElementById(`register_${context}`);
  dialog.close();
}

const applyFilters = () => {
  filtered = true;
  const districts = Array.from(document.querySelectorAll('#districts input[type="checkbox"]:checked')).map(el => el.value);
  const valueRange = parseFloat(document.querySelector('#value_range').value) || 999999;
  const rooms = parseInt(document.querySelector('#rooms').value) || 0;
  const garageSpaces = parseInt(document.querySelector('#garage_spaces').value) || 0;
  const requiredPets = document.querySelector('#required_accepts_pets').value === 'true';

  propertiesResult = properties.filter(property =>
    districts.includes(property.address.district) &&
    propertyTypeSelected === property.details.type &&
    valueRange >= property.billings.totalMonthlyCosts &&
    rooms <= property.details.rooms &&
    garageSpaces <= property.details.garageSpaces &&
    (!requiredPets || property.details.accepetsPets)
  );

  dataDemand.criteria = {
    city: actualCity,
    districts,
    propertyType: propertyTypeSelected,
    rooms,
    garageSpaces,
    requiredAccepetsPets: requiredPets
  };

  currentShowPropertyIndex = 0;
  isProcessingInsertProperties = false;
  document.getElementById('item').classList.add('hidden');
  document.getElementById('result_empty')?.remove();
  document.getElementById('button_clean_filter').classList.remove('hidden');
  document.getElementById('button_open_filter').classList.add('hidden');
  document.getElementById('filters_dialog').close();

  if (!propertiesResult.length) {
    const empty = document.createElement('p');
    empty.id = 'result_empty';
    empty.textContent = 'Não encontramos imóveis com esse perfil no momento, ajuste os filtros para ver outras opções.';
    document.getElementById('search_result').appendChild(empty);
    document.getElementById('register_demand_search_empty').showModal();
    return;
  }
  processResults();
};

const cleanFilters = () => {
  filtered = false;
  ['value_range', 'required_accepts_pets', 'rooms', 'garage_spaces'].forEach(id => { document.getElementById(id).selectedIndex = 0; });
  document.querySelectorAll('#districts input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
  });
  dataDemand.criteria = {
    city: actualCity,
    districts: districtsOptions,
    propertyType: propertyTypeSelected,
    rooms: 0,
    garageSpaces: 0,
    requiredAccepetsPets: false,
  };

  propertiesResult = properties.filter(property => propertyTypeSelected === property.details.type);
  currentShowPropertyIndex = document.getElementById('item').children.length;
  isProcessingInsertProperties = false;
  document.getElementById('item_result').replaceChildren();
  document.getElementById('item').classList.remove('hidden');
  document.getElementById('result_empty')?.remove();
  document.getElementById('button_clean_filter').classList.add('hidden');
  document.getElementById('button_open_filter').classList.remove('hidden');
}

const openRegisterDemandDialog = () => document.getElementById('register_demand_all').showModal();

Object.assign(window, {
  applyFilters,
  cleanFilters,
  closeDialog,
  handleCityChange,
  handlePropertyTypeSearchChange,
  maskPhone,
  openFiltersDialog,
  openRegisterDemandDialog,
  processContact,
  processRegistDemand
});

window.addEventListener('scroll', () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (nearBottom) {
    processResults();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  function setBodyFullHeight() {
    const altura = window.innerHeight;
    document.body.style.minHeight = altura + "px";
  }

  window.addEventListener("load", setBodyFullHeight);
  window.addEventListener("resize", setBodyFullHeight);
  window.addEventListener("orientationchange", setBodyFullHeight);

  const selectCity = document.getElementById('select_city');
  citiesOptions.forEach(city => {
    const option = document.createElement('option');
    option.value = city.value;
    option.textContent = city.label;
    if (city.label === actualCity) {
      option.selected = true;
    }
    selectCity.appendChild(option);
  });

  propertyTypeSelected = document.body.dataset.propertyType;
  if (propertyTypeSelected) {
    const optionDistricts = document.getElementById("options_districts");
    districtsOptions.forEach(district => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = district;
      checkbox.checked = true;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(district));
      optionDistricts.appendChild(label);
    });

    document.getElementById('type_property').value = propertyTypeSelected;
    dataDemand.criteria.propertyType = propertyTypeSelected;
    propertiesResult = properties.filter(property => propertyTypeSelected === property.details.type);
    if (!propertiesResult.length) {
      const buttonOpenFilters = document.getElementById('button_open_filter');
      buttonOpenFilters.classList.add('hidden');

      const empty = document.createElement('p');
      empty.id = 'result_empty';
      empty.textContent = 'Não encontramos imóveis com esse perfil no momento, ajuste os filtros para ver outras opções.';
      document.getElementById('search_result').appendChild(empty);
      document.getElementById('register_demand_search_empty').showModal();
      return;
    }
  }

  document.querySelector('.search_result').addEventListener('click', (e) => {
    const ad = e.target.closest('article.ad');
    if (!ad) return;

    const strategies = [
      {
        match: (target) => target.closest('.btn_prev'),
        action: () => navigateCarousel(ad.dataset.id, 'prev', 'article')
      },
      {
        match: (target) => target.closest('.btn_next'),
        action: () => navigateCarousel(ad.dataset.id, 'next', 'article')
      },
      {
        match: () => true,
        action: () => openPopup(ad.dataset.id)
      }
    ];

    for (const strategy of strategies) {
      if (strategy.match(e.target)) {
        strategy.action();
        break;
      }
    }
  });

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get('id');
  if (propertyId) {
    openPopup(propertyId, true);
  }

  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelector('.options');
    const toggleButton = document.getElementById(`${select.id}_toggle`);
    const checkboxes = options.querySelectorAll('input[type="checkbox"]');
    const updateSelectedDistricts = () => {
      const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      if (selected.length === checkboxes.length) {
        trigger.textContent = 'Todos selecionados';
      } else {
        trigger.textContent = selected.length > 0 ? selected.join(', ') : 'Selecione';
      }

      if (toggleButton) {
        toggleButton.textContent = selected.length > 0 ? 'Remover seleção' : 'Selecionar todos';
      }
    };

    trigger.addEventListener('click', () => {
      options.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!select.contains(e.target)) {
        options.classList.remove('open');
      }
    });

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectedDistricts);
    });

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const hasSelectedDistrict = Array.from(checkboxes).some(checkbox => checkbox.checked);
        checkboxes.forEach(checkbox => {
          checkbox.checked = !hasSelectedDistrict;
        });
        updateSelectedDistricts();
      });
    }

    updateSelectedDistricts();
  });
});
