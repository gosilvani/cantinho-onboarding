const company = {
  name: 'cantinho-teste',
  tenant: 'cantinho-teste',
  dns: 'www.test-v1.cantinho.co',
  GTM: 'GTM-XXXXXXX',
  siteMode: 'both',
  address: {
    street: 'Rua B',
    number: '10',
    complement: 'Apto 101',
    district: 'Centro',
    city: 'Espera Feliz',
    state: 'MG',
  },
  contact: {
    email: 'cantinho-mkt@gmail.com',
    phone: '32984835145',
    whatsapp: '32984835145'
  },
  citiesAndDistricts: [
    {
      name: 'Espera Feliz - MG',
      districts: ['centro', 'joão clara', 'santa cecília', 'área de lazer']
    },
    {
      name: 'Carangola - MG',
      districts: ['centro', 'coroado', 'santa emilia', 'cruzeiro']
    }
  ],
};

const user = {
  name: 'Silvani Gonçalves',
  email: 'go.silvani@gmail.com',
  password: '10203050',
  type: 'companyAdmin',
};

const theme = {
  logoFileName: 'logo.svg',
  faviconFileName: 'favicon.ico',
  contents: {
    home: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'Teste',
      metaDescription: 'Teste'
    },
    about: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'Teste',
      metaDescription: 'Teste'
    },
    propertySale: {
      metaDescription: 'Teste'
    },
    propertyRent: {
      metaDescription: 'Teste'
    }
  },
  colors: {
    line: '#D0A616',
    background: '#F4F4F4',
    buttons: {
      transparent: {
        text: '#D0A616',
        border: '#D0A616'
      },
      solid: {
        background: '#D0A616',
        text: '#2C345C'
      },
      remove: {
        background: '#B21313',
        text: '#F2F2F2'
      }
    },
    text: {
      title: '#2C345C',
      default: '#2C345C',
      highlight: '#D0A616'
    },
    forms: {
      label: '#2C345C',
      input: {
        background: '#D5DADE',
        text: '#2C345C'
      }
    },
    ads: {
      background: '#fff',
      border: '#ddd'
    }
  }
}

module.exports = { company, user, theme };
