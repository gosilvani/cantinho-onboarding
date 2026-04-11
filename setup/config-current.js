const company = {
  name: 'Léo Imóveis',
  tenant: 'leo-imoveis-test',
  dns: 'www.leoimoveis.cantinho.co',
  GTM: 'GTM-NMNWZRNJ',
  siteMode: 'sale',
  address: {
    street: 'Av. João Vieira da Costa',
    number: '970',
    complement: 'Loja 1',
    district: 'Centro',
    city: 'Espera Feliz',
    state: 'MG',
  },
  contact: {
    email: 'elielfx@yahoo.com.br',
    phone: '32984163506',
    whatsapp: '32984163506'
  },
  citiesAndDistricts: [
    {
      name: 'Espera Feliz - MG',
      districts: ['centro', 'mineradora', 'retas', 'área de lazer', 'joão do roque', 'santa cecília', 'são francisco', 'patronato', 'waltair', 'santa luzia', 'floresta', 'joão clara', 'santa inês', 'novo horizonte', 'vale do sol']
    }
  ],
};

const user = {
  name: 'Eliel Ferreira',
  email: 'elielfx@yahoo.com.br',
  password: '10203050',
  type: 'companyAdmin',
};

const theme = {
  logoFileName: 'logo.svg',
  faviconFileName: 'favicon.ico',
  contents: {
    home: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'O seu melhor negócio está aqui',
      metaDescription: 'Encontre as melhores oportunidades em imóveis com a Léo Imóveis. Compra e venda com atendimento confiável e as melhores opções da região.'
    },
    about: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'O seu melhor negócio está aqui. Na Léo Imóveis, trabalhamos para conectar você às melhores oportunidades do mercado, com atendimento próximo, transparência e compromisso em cada negociação. Nosso objetivo é tornar sua experiência simples, segura e eficiente.',
      metaDescription: 'Conheça a Léo Imóveis e nossa dedicação em oferecer atendimento de qualidade, transparência e as melhores oportunidades para você comprar e vender.'
    },
    propertySale: {
      metaDescription: 'Confira imóveis à venda com a Léo Imóveis em {{city}}. Casas, apartamentos e terrenos com ótimas oportunidades para você investir ou morar.'
    },
    propertyRent: {
      metaDescription: 'Encontre imóveis para alugar com a Léo Imóveis em {{city}}. Opções ideais para morar com praticidade, segurança e excelente custo-benefício.'
    }
  },
  colors: {
    line: '#D9CE0F',
    background: '#E6E6E6',
    buttons: {
      transparent: {
        text: '#201E1E',
        border: '#201E1E'
      },
      solid: {
        background: '#D9CE0F',
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
      highlight: '#D9CE0F'
    },
    forms: {
      label: '#201E1E',
      input: {
        background: '#D5DADE',
        text: '#201E1E'
      }
    },
    ads: {
      background: '#fff',
      border: '#ddd'
    }
  }
}

module.exports = { company, user, theme };
