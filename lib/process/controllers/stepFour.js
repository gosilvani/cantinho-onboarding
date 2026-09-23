const services = require('../services');

const stepFour = async (tenant) => {
  const company = await services.getCompany(tenant);
  const theme = await services.getTheme(tenant);
  await services.buildSite(company.tenant, company, theme);
  await services.uploadFiles(tenant);
  return true;
};

module.exports = { stepFour };
