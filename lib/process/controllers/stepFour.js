const services = require('../services');

const stepFour = async (tenant) => {
  try {
    const company = await services.getCompany(tenant);
    const theme = await services.getTheme(tenant);
    await services.buildSite(company.tenant, company, theme);
    await services.uploadFiles(tenant);
  } catch (error) {
    console.log(`Erro inesperado. Erro: ${error}`);
  }
};

module.exports = { stepFour };
