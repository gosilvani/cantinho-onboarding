const company = {
  name: '',
  tenant: '',
  dns: '',
  siteMode: '',
  gtm: '',
  creci: [
    {
      label: '',
      number: ''
    }
  ],
  address: {
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
  },
  contacts: [
    {
      label: '',
      number: '',
      hasWhatsapp: false,
      context: ''
    }
  ],
  citiesAndDistricts: [
    {
      name: '',
      districts: []
    }
  ]
};

const user = {
  name: '',
  email: '',
  password: '',
  type: 'companyAdmin',
};

const theme = {
  logoFileName: '',
  faviconFileName: '',
  contents: {
    home: {
      heroImageFileName: '',
      heroText: '',
      metaDescription: ''
    },
    about: {
      heroImageFileName: '',
      heroText: '',
      metaDescription: ''
    },
    propertySale: {
      metaDescription: ''
    },
    propertyRent: {
      metaDescription: ''
    }
  },
  colors: {
    line: '',
    background: '',
    buttons: {
      transparent: {
        text: '',
        border: ''
      },
      solid: {
        background: '',
        text: ''
      },
      remove: {
        background: '',
        text: ''
      }
    },
    text: {
      title: '',
      default: '',
      highlight: '',
      hero: ''
    },
    forms: {
      label: '',
      input: {
        background: '',
        text: ''
      }
    },
    ads: {
      background: '',
      border: '',
      line: ''
    }
  }
}

module.exports = { company, user, theme };
