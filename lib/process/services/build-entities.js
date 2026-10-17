const bcrypt = require('bcryptjs');
const { capitalizeLetter } = require('../../utils');

const buildCompanyBase = (companyData, currentDate) => ({
  name: capitalizeLetter(companyData.name, 'allFirstLetters'),
  tenant: companyData.tenant.toLowerCase(),
  ...(companyData.creci && {
    creci: companyData.creci.map(creci => ({
      label: capitalizeLetter(creci.label, 'allFirstLetters'),
      number: creci.number
    }))
  }),
  ...(companyData.address && { address: {
    street: capitalizeLetter(companyData.address.street, 'allFirstLetters'),
    number: companyData.address.number,
    ...(companyData.address?.complement && { complement: capitalizeLetter(companyData.address.complement, 'allFirstLetters') }),
    district: capitalizeLetter(companyData.address.district, 'allFirstLetters'),
    city: capitalizeLetter(companyData.address.city, 'allFirstLetters'),
    state: companyData.address.state.toUpperCase(),
  } }),
  contacts: companyData.contacts.map(contact => ({
    label: capitalizeLetter(contact.label, 'allFirstLetters'),
    number: contact.number,
    hasWhatsapp: contact.hasWhatsapp,
    context: contact.context
  })),
  status: {
    name: 'active',
    timestamp: currentDate
  },
  createdAt: currentDate,
  updatedAt: currentDate
});

const buildUser = async (userData, tenant, currentDate) => ({
  name: capitalizeLetter(userData.name, 'allFirstLetters'),
  email: userData.email.toLowerCase(),
  password: await bcrypt.hash(userData.password, 10),
  type: userData.type,
  tenant,
  status: {
    name: 'active',
    timestamp: currentDate
  },
  createdAt: currentDate,
  updatedAt: currentDate
});

const buildEntitiesComplete = async (companyData, userData, themeData) => {
  const currentDate = new Date();
  const company = {
    ...buildCompanyBase(companyData, currentDate),
    dns: companyData.dns.toLowerCase(),
    type: 'complete',
    siteMode: companyData.siteMode,
    gtm: companyData.gtm,
    directory: companyData.tenant.toLowerCase(),
    citiesAndDistricts: companyData.citiesAndDistricts.sort((a, b) => a.name.localeCompare(b.name)).map(city => ({
      name: capitalizeLetter(city.name, 'allFirstLetters'),
      districts: city.districts.sort((a, b) => a.localeCompare(b)).map(district => capitalizeLetter(district, 'allFirstLetters'))
    })),
  };
  const user = await buildUser(userData, company.tenant, currentDate);
  const theme = {
    theme: {
      logoFileName: themeData.logoFileName,
      faviconFileName: themeData.faviconFileName,
      contents: {
        home: {
          heroImageFileName: themeData.contents.home.heroImageFileName,
          heroText: themeData.contents.home.heroText,
          metaDescription: themeData.contents.home.metaDescription
        },
        about: {
          heroImageFileName: themeData.contents.about.heroImageFileName,
          heroText: themeData.contents.about.heroText,
          address: `${company.address.street}, nº ${company.address.number} ${company.address.complement ? company.address.complement : ''}, ${company.address.district}`,
          city: `${company.address.city} - ${company.address.state}`,
          metaDescription: themeData.contents.about.metaDescription
        },
        propertySale: {
          metaDescription: themeData.contents.propertySale.metaDescription
        },
        propertyRent: {
          metaDescription: themeData.contents.propertyRent.metaDescription
        }
      },
      colors: themeData.colors
    },
    tenant: company.tenant,
    createdAt: currentDate,
    updatedAt: currentDate
  };
  return { company, user, theme };
}

const buildEntitiesFree = async (companyData, userData) => {
  const currentDate = new Date();
  const company = { ...buildCompanyBase(companyData, currentDate), type: 'free' };
  const user = await buildUser(userData, company.tenant, currentDate);
  return { company, user };
};

const buildEntitiesPortal = async (companyData, userData) => {
  const currentDate = new Date();
  const companyBase = buildCompanyBase(companyData, currentDate);
  const company = {
    ...companyBase,
    type: 'portal',
    dns: `${process.env.DNS_MEDIA_CDN.toLowerCase()}/${companyBase.tenant}`,
    logoFileName: companyData.logoFileName
  };
  const user = await buildUser(userData, company.tenant, currentDate);
  return { company, user };
};

module.exports = { buildEntitiesComplete, buildEntitiesFree, buildEntitiesPortal };
