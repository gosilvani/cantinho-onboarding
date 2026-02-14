const company = {
  name: 'imob both',
  tenant: 'imob-both',
  dns: 'www.imob-both.cantinho.co',
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
    email: 'teste@gmail.com',
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
  name: 'teste',
  email: 'teste@gmail.com',
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
    background: '#f2f2f2',
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
        background: '#ff0000',
        text: '#fff'
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
