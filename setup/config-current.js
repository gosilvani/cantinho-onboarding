const company = {
  name: 'teste2',
  tenant: 'cantinho-teste4',
  dns: 'www.teste2.cantinho.co',
  GTM: 'GTM-XXXXXXX',
  siteMode: 'rent',
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
      districts: ['centro']
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
    line: '#000',
    background: '#f2f2f2',
    buttons: {
      transparent: {
        text: '#000',
        border: '#000'
      },
      solid: {
        background: '#000',
        text: '#fff'
      },
      remove: {
        background: '#ff0000',
        text: '#fff'
      }
    },
    text: {
      title: '#000',
      default: '#000',
      highlight: '#000'
    },
    forms: {
      label: '#000',
      input: {
        background: '#000',
        text: '#fff'
      }
    },
    ads: {
      background: '#000',
      border: '#000'
    }
  }
}

module.exports = { company, user, theme };
