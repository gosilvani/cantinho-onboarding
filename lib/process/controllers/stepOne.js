const config = require('../../../setup/config-current.js');
const services = require('../services/index.js');

const stepOne = async () => {
  const resultValidateStep = await services.validateStep(config.company?.tenant, 'stepOne');
  if (!resultValidateStep.valid) {
    throw new Error(`stepOne não executado: ${resultValidateStep.message}`);
  };
  const resultValidateProcess = await services.validateProcess(
    config.company?.tenant,
    config.company,
    config.user,
    config.theme
  );
  if (!resultValidateProcess.valid) {
    throw new Error(`stepOne não executado: ${resultValidateProcess.message}`);
  };
  const { company, user, theme } = await services.buildEntities(config.company, config.user, config.theme);
  await services.insertEntities(company, user, theme);
  await services.buildSite(company.tenant, company, theme);
  await services.insertProcess(company.tenant, 'stepOne');
  return true;
}

module.exports = { stepOne };
