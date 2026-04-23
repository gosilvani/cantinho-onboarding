const company = {
  name: 'Michele Corretora',
  tenant: 'michele-corretora',
  dns: 'www.michelecorretora.cantinho.co',
  GTM: 'GTM-PNMX8SBQ',
  siteMode: 'sale',
  creci: '41.938',
  address: {
    street: 'Av. João Vieira da Costa',
    number: '970',
    complement: 'Loja 1',
    district: 'Centro',
    city: 'Espera Feliz',
    state: 'MG',
  },
  contact: {
    email: 'mifrauches@hotmail.com',
    phone: '32984081203',
    whatsapp: '32984081203'
  },
  citiesAndDistricts: [
    {
      name: 'Alto Caparaó - MG',
      districts: [
        'Água Verde',
        'Bela Vista',
        'Campo Belo',
        'Centro',
        'Independência',
        'Liberdade',
        'Serra Monte',
        'Val Paraíso',
        'Vale das Hortências',
        'Zona Rural'
      ]
    },
    {
      name: 'Alto Jequitibá - MG',
      districts: [
        'Bela Vista',
        'Centro',
        'Colina',
        'Encosta do Sol',
        'Guilherme Sathler',
        'Loanda',
        'Vila Leopoldina',
        'Zona Rural'
      ]
    },
    {
      name: 'Caiana - MG',
      districts: [
        'Centro',
        'Zona Rural'
      ]
    },
    {
      name: 'Caparaó - MG',
      districts: [
        'Centro',
        'Zona Rural'
      ]
    },
    {
      name: 'Carangola - MG',
      districts: [
        'Aeroporto',
        'Amendoeira',
        "Caixa D'Água",
        'Centro',
        'Chevrand',
        'Coroado',
        'Eldorado',
        'Floresta',
        'Lacerdina',
        'Novos Tempos',
        'Ouro Verde',
        'Panorama',
        'Santa Emília',
        'Santa Maria',
        'Santo Onofre',
        'Triângulo',
        'Varginha',
        'Zona Rural'
      ]
    },
    {
      name: 'Dores do Rio Preto - ES',
      districts: [
        'Centro',
        'Cidade Alta',
        'Zona Rural'
      ]
    },
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
    },
    {
      name: 'Guaçuí - ES',
      districts: [
        'Amnorte',
        'Bela Vista',
        'Centro',
        'Edith Castro',
        'Horto Florestal',
        'João Ferras de Araújo',
        'Lula Pires',
        'Santa Cecília',
        'São José',
        'Zona Rural'
      ]
    },
    {
      name: 'Manhumirim - MG',
      districts: [
        'Bonfim',
        'Centro',
        'Cidade Jardim',
        'Lessa',
        'Nossa Senhora Aparecida',
        'Nossa Senhora da Penha',
        'Roque',
        'Santa Rita',
        'Santo Antônio',
        'Seminário',
        'Zona Rural'
      ]
    }
  ],
};

const user = {
  name: 'Michele Frauches',
  email: 'mifrauches@hotmail.com',
  password: '10203050',
  type: 'companyAdmin',
};

const theme = {
  logoFileName: 'logo.svg',
  faviconFileName: 'favicon.ico',
  contents: {
    home: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'O seu melhor negócio está aqui.',
      metaDescription: 'Encontre as melhores oportunidades em imóveis com a Michele Corretora. Compra e venda com atendimento confiável e as melhores opções da região.'
    },
    about: {
      heroImageFileName: 'hero-image.svg',
      heroText: 'O seu melhor negócio está aqui. Na Michele Corretora, trabalhamos para conectar você às melhores oportunidades do mercado, com atendimento próximo, transparência e compromisso em cada negociação. Nosso objetivo é tornar sua experiência simples, segura e eficiente.',
      metaDescription: 'Conheça a Michele Corretora e nossa dedicação em oferecer atendimento de qualidade, transparência e as melhores oportunidades para você comprar e vender.'
    },
    propertySale: {
      metaDescription: 'Confira imóveis à venda com a Michele Corretora em {{city}}. Casas, apartamentos e terrenos com ótimas oportunidades para você investir ou morar.'
    },
    propertyRent: {
      metaDescription: 'Encontre imóveis para alugar com a Michele Corretora em {{city}}. Opções ideais para morar com praticidade, segurança e excelente custo-benefício.'
    }
  },
  colors: {
    line: '#D4AD68',
    background: '#F4F4F4',
    buttons: {
      transparent: {
        text: '#D4AD68',
        border: '#D4AD68'
      },
      solid: {
        background: '#D4AD68',
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
      highlight: '#D4AD68'
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
