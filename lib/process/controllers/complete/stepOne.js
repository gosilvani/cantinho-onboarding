const { validatePartnerAvailability } = require('../../services/validate-partner-availability');
const services = require('../../services/index.js');

const config = require('../../../../setup/config-current-complete.js');

const stepOne = async () => {
  const companyData = config.company;
  const userData = config.user;
  const resultValidateStep = await services.validateStep(companyData?.tenant, 'stepOne');
  if (!resultValidateStep.valid) {
    throw new Error(`stepOne não executado: ${resultValidateStep.message}`);
  };
  const resultValidateProcess = await services.validateProcessComplete(
    companyData?.tenant,
    companyData,
    userData,
    config.theme
  );
  if (!resultValidateProcess.valid) {
    throw new Error(`stepOne não executado: ${resultValidateProcess.message}`);
  };
  const availabilityTenantAndUserEmail = await validatePartnerAvailability(companyData.tenant, userData.email);
  if (!availabilityTenantAndUserEmail.valid) {
    throw new Error(`stepOne não executado: ${availabilityTenantAndUserEmail.message}`);
  }
  const { company, user, theme } = await services.buildEntitiesComplete(companyData, userData, config.theme);
  await services.insertEntitiesComplete(company, user, theme);
  await services.buildSite(company.tenant, company, theme);
  await services.insertProcess(company.tenant, 'stepOne');
  return true;
}

module.exports = { stepOne };
