const services = require('../services');

const stepThree = async (tenant) => {
  const resultValidateStep = await services.validateStep(tenant, 'stepThree');
  if (!resultValidateStep.valid) {
    throw new Error(`stepThree não executado: ${resultValidateStep.message}`);
  };
  const company = await services.getCompany(tenant);
  const resultValidateCertificate = await services.validateCertificate(tenant, company);
  if (!resultValidateCertificate.valid) {
    throw new Error(`stepThree não executado: ${resultValidateCertificate.message}`);
  };
  await services.createCdn(tenant, company);
  const eventBridgeRuleArns = await services.createEventBridgeRule(tenant, company);
  await services.addLambdaPermissionForEventBridge(tenant, company, eventBridgeRuleArns);
  await services.insertProcess(tenant, 'stepThree');
  return true;
};

module.exports = { stepThree };
