const company = {
  name: 'Corretor Portal',
  tenant: 'portal-tenant-t',
  logoFileName: 'logo.svg',
  creci: [
    {
      label: 'Corretor Gratuito',
      number: '15.000-J/MG'
    }
  ],
  address: {
    street: 'Rua teste',
    number: '20',
    complement: 'Teste',
    district: 'Centro',
    city: 'Espera Feliz',
    state: 'MG'
  },
  contacts: [
    {
      label: 'Comercial',
      number: '32984835145',
      hasWhatsapp: true,
      context: 'both'
    }
  ]
};

const user = {
  name: 'Usuário portal',
  email: 'portal@gmail.com',
  password: '10203050',
  type: 'companyAdmin'
};

module.exports = { company, user };
