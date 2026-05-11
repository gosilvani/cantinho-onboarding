const company = {
  name: 'Cantinho',
  tenant: 'cantinho',
  dns: 'www.cantinho.co',
  GTM: 'GTM-5V53PR5N',
  siteMode: 'both',
  address: {
    street: 'Rua Caiana',
    number: '491',
    complement: 'Ap 102',
    district: 'Área de Lazer',
    city: 'Espera Feliz',
    state: 'MG',
  },
  contact: {
    email: 'go.silvani@gmail.com',
    phone: '32984835145',
    whatsapp: '32984835145'
  },
  citiesAndDistricts: [
    {
      name: 'Espera Feliz - MG',
      districts: [
        'Área de Lazer',
        'Centro',
        'Floresta',
        'João Clara',
        'João do Roque',
        'Mineradora',
        'Novo Horizonte',
        'Patronato',
        'Retas',
        'Santa Cecília',
        'Santa Inês',
        'Santa Luzia',
        'São Francisco',
        'Vale do Sol 1',
        'Vale do Sol 2',
        'Waltair',
        'Zona Rural'
      ]
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
      heroText: 'Estamos aqui para ajudar você a encontrar o seu canto.',
      metaDescription: 'Encontre os melhores imóveis no cantinho.co'
    },
    about: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'O Cantinho é uma plataforma criada para ajudar corretores e imobiliárias a divulgar imóveis, organizar atendimentos e conectar imóveis com pessoas que realmente estão procurando por eles. Além do portal da cidade, cada parceiro também possui um site personalizado exclusivo para os seus imóveis, com ferramentas de cadastro e notificação automática de clientes interessados.',
      metaDescription: 'Saiba mais sobre o cantinho.'
    },
    propertySale: {
      metaDescription: 'Confira imóveis à venda em {{city}}. Casas, apartamentos e terrenos com ótimas oportunidades para você investir ou morar.'
    },
    propertyRent: {
      metaDescription: 'Encontre imóveis para alugar em {{city}}. Opções ideais para morar com praticidade, segurança e excelente custo-benefício.'
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
