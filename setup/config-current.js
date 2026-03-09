const company = {
  name: 'Tairone Rezende',
  tenant: 'tairone-rezende',
  dns: 'www.taironerezende.cantinho.co',
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
    phone: '32984423771',
    whatsapp: '32984423771'
  },
  citiesAndDistricts: [
    {
      name: 'Espera Feliz - MG',
      districts: ['centro', 'joão clara', 'santa cecília', 'área de lazer']
    }
  ],
};

const user = {
  name: 'Tairone',
  email: 'tairone@gmail.com',
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
    line: '#015699',
    background: '#F4F4F4',
    buttons: {
      transparent: {
        text: '#015699',
        border: '#015699'
      },
      solid: {
        background: '#015699',
        text: '#EBEBEB'
      },
      remove: {
        background: '#B21313',
        text: '#F2F2F2'
      }
    },
    text: {
      title: '#2C345C',
      default: '#2C345C',
      highlight: '#015699'
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
