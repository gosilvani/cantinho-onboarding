const company = {
  name: 'Vitor Tenório',
  tenant: 'vitor-tenorio',
  dns: 'www.vitortenorio.cantinho.co',
  siteMode: 'sale',
  gtm: 'GTM-WBLMTGCD',
  creci: [
    {
      label: '',
      number: ''
    }
  ],
  address: {
    street: 'Rua Daniela Matos de Mendonça',
    number: '16',
    district: 'São José',
    city: 'Juazeiro do Norte',
    state: 'CE',
  },
  contacts: [
    {
      label: 'Atendimento',
      number: '88998039479',
      hasWhatsapp: true,
      context: 'both'
    }
  ],
  citiesAndDistricts: [
    {
      "name": "Barbalha - CE",
      "districts": [
        "Alto da Alegria",
        "Bulandeira",
        "Centro",
        "Cidade Kariris",
        "Cirolândia",
        "Fátima",
        "Jardim dos Ipês",
        "Malvinas",
        "Mata dos Dudas",
        "Mata dos Limas",
        "Novo Araçás",
        "Populares",
        "Rosário",
        "Santo Antônio",
        "Vila Santo Antônio",
        "Zona Rural"
      ]
    },
    {
      "name": "Crato - CE",
      "districts": [
        "Aderson Tavares Bezerra",
        "Alto da Penha",
        "Centro",
        "Gisélia Pinheiro",
        "Grangeiro",
        "Mirandão",
        "Muriti",
        "Nossa Senhora de Fátima",
        "Novo Horizonte",
        "Novo Lameiro",
        "Ossian Araripe",
        "Parque Grangeiro",
        "Pimenta",
        "Pinto Madeira",
        "Santa Luzia",
        "São Bento",
        "São José",
        "São Miguel",
        "Seminário",
        "Sossego",
        "Vila Alta",
        "Zacarias Gonçalves",
        "Zona Rural"
      ]
    },
    {
      "name": "Juazeiro do Norte - CE",
      "districts": [
        "Aeroporto",
        "Antônio Vieira",
        "Carité",
        "Centro",
        "Cidade Universitária",
        "Franciscanos",
        "Frei Damião",
        "Grangeiro",
        "Horto",
        "Jardim Gonzaga",
        "João Cabral",
        "José Geraldo da Cruz",
        "Lagoa Seca",
        "Limoeiro",
        "Logradouro",
        "Manoel Chaves",
        "Novo Juazeiro",
        "Pedrinhas",
        "Pio XII",
        "Pirajá",
        "Planalto",
        "Romeirão",
        "Salesianos",
        "Salgadinho",
        "Sancta Maria",
        "Santa Tereza",
        "Santo Antônio",
        "São José",
        "São Miguel",
        "Socorro",
        "Tiradentes",
        "Triângulo",
        "Vila Fátima",
        "Vila Real",
        "Zona Rural"
      ]
    }
  ]
};

const user = {
  name: 'Vitor Tenório',
  email: 'vitor.tenorio.casadaarvore@gmail.com',
  password: '10204570',
  type: 'companyAdmin',
};

const theme = {
  logoFileName: 'logo.svg',
  faviconFileName: 'favicon.ico',
  contents: {
    home: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'O seu sonho de ter a casa própria está mais perto do que você imagina!',
      metaDescription: 'Encontre seu próximo imóvel com Vitor Tenório. Confira imóveis à venda e conte com atendimento personalizado em cada etapa da compra.'
    },
    about: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'Vitor Tenório é corretor de imóveis com atuação exclusiva na compra e venda. Seu trabalho começa por entender o que cada cliente procura, para apresentar opções alinhadas às suas necessidades e ao seu momento de vida. Com atendimento próximo e informações claras, acompanha cada etapa da negociação para ajudar você a tomar uma decisão com confiança.',
      metaDescription: 'Conheça Vitor Tenório, corretor dedicado à compra e venda de imóveis, com atendimento próximo e foco nas necessidades de cada cliente.'
    },
    propertySale: {
      metaDescription: 'Seu próximo imóvel pode estar aqui: {{propertyType}} à venda em {{city}}. Conheça os detalhes e agende sua visita com Vitor Tenório.'
    },
    propertyRent: {
      metaDescription: 'Seu próximo imóvel pode estar aqui: {{propertyType}} para alugar em {{city}}. Conheça os detalhes e agende sua visita com Vitor Tenório.'
    }
  },
  colors: {
    line: '#CFA960',
    background: '#F4F4F4',
    buttons: {
      transparent: {
        text: '#CFA960',
        border: '#CFA960'
      },
      solid: {
        background: '#CFA960',
        text: '#010207'
      },
      remove: {
        background: '#B21313',
        text: '#FCFDF5'
      }
    },
    text: {
      title: '#010207',
      default: '#010207',
      highlight: '#CFA960',
      hero: '#CFA960'
    },
    forms: {
      label: '#010207',
      input: {
        background: '#D5DADE',
        text: '#010207'
      }
    },
    ads: {
      background: '#fff',
      border: '#ddd',
      line: '#CFA960'
    }
  }
}

module.exports = { company, user, theme };
