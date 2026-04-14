const database = require('../../database');

const companyCollection = 'themes';

const getTheme = async (tenant) => {
  const company = await database.getCollection(companyCollection).findOne({ tenant });
  if (!company) {
    throw new Error(`Theme not found for tenant: ${tenant}`);
  };
  return company;
}

module.exports = { getTheme };
