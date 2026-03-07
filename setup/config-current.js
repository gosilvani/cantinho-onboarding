const company = {
  name: 'Mariana Rodrigues Corretora de Imóveis',
  tenant: 'demo-mariana-rodrigues-corretora-de-imoveis',
  dns: 'www.marianarodrigues.cantinho.co',
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
    email: 'mariana@gmail.com',
    phone: '32984375738',
    whatsapp: '32984375738'
  },
  citiesAndDistricts: [
    {
      name: 'Espera Feliz - MG',
      districts: ['centro', 'joão clara', 'santa cecília', 'área de lazer']
    }
  ],
};

const user = {
  name: 'Mariana Rodrigues',
  email: 'mariana@gmail.com',
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
    line: '#3E4095',
    background: '#F4F4F4',
    buttons: {
      transparent: {
        text: '#3E4095',
        border: '#3E4095'
      },
      solid: {
        background: '#3E4095',
        text: '#EBEBEB'
      },
      remove: {
        background: '#B21313',
        text: '#F2F2F2'
      }
    },
    text: {
      title: '#3E4095',
      default: '#3E4095',
      highlight: '#3E4095'
    },
    forms: {
      label: '#3E4095',
      input: {
        background: '#D5DADE',
        text: '#3E4095'
      }
    },
    ads: {
      background: '#fff',
      border: '#ddd'
    }
  }
}

module.exports = { company, user, theme };
