const company = {
  name: '',
  tenant: '',
  creci: [
    {
      label: '',
      number: ''
    }
  ],
  address: {
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: ''
  },
  contacts: [
    {
      label: 'Comercial',
      number: '',
      hasWhatsapp: true,
      context: 'both'
    }
  ]
};

const user = {
  name: '',
  email: '',
  password: '',
  type: 'companyAdmin'
};

module.exports = { company, user };
