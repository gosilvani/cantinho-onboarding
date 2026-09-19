const services = require('../services');

const stepTwo = async (tenant) => {
  const resultValidateStep = await services.validateStep(tenant, 'stepTwo');
  if (!resultValidateStep.valid) {
    throw new Error(`stepTwo não executado: ${resultValidateStep.message}`);
  };
  await services.getCompany(tenant);
  await services.uploadFiles(tenant);
  await services.requestCertificate(tenant);
  await services.insertProcess(tenant, 'stepTwo');
  return true;
};

module.exports = { stepTwo };
