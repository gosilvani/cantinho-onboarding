const company = {
  name: 'preta corretora',
  tenant: 'preta-corretora-teste',
  dns: 'www.pretacorretora.cantinho.co',
  GTM: 'GTM-N4N2WW7K',
  address: {
    street: 'Av. Roque Ferreira de Castro',
    number: '165',
    complement: 'Sala 01',
    district: 'Centro',
    city: 'Espera Feliz',
    state: 'MG',
  },
  contact: {
    email: 'pretacorretora@gmail.com',
    phone: '32984083980',
    whatsapp: '32984083980'
  },
  citiesAndDistricts: [
    {
      name: 'Espera Feliz - MG',
      districts: ['Centro', 'João Clara']
    }
  ],
};

const user = {
  name: 'Preta',
  email: 'teste-preta@gmail.com',
  password: '10203040',
  type: 'companyAdmin',
};

const theme = {
  logoFileName: 'logo.svg',
  faviconFileName: 'favicon.ico',
  contents: {
    home: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'Os melhores imóveis com a confiança da Preta.',
      metaDescription: 'teste-home'
    },
    about: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'Nossa missão é cuidar do seu patrimônio com profissionalismo e transparência, atuando há mais de 10 anos no mercado com compra, venda e locação de imóveis residenciais, sítios e outras propriedades, e oferecendo soluções que tornam cada etapa mais simples, ágil e segura para proprietários e clientes.',
      metaDescription: 'teste-about'
    },
    propertySale: {
      metaDescription: 'teste-property-sale-{city}'
    },
    propertyRent: {
      metaDescription: 'teste-property-rent-{city}'
    }
  },
  colors: {
    line: '#F58634',
    background: '#F7E257',
    buttons: {
      transparent: {
        text: '#F58634',
        border: '#F58634'
      },
      solid: {
        background: '#F58634',
        text: '#201E1E'
      },
      remove: {
        background: '#B21313',
        text: '#F2F2F2'
      }
    },
    text: {
      title: '#201E1E',
      default: '#201E1E',
      highlight: '#F58634'
    },
    forms: {
      label: '#201E1E',
      input: {
        background: '#E6E6E6',
        text: '#201E1E'
      }
    },
    ads: {
      background: '#E6E6E6',
      border: '#dddddd'
    }
  }
}

module.exports = { company, user, theme };
