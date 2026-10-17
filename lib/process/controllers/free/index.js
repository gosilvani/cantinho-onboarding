const { validateProcessFree } = require('../../services/validate-process');
const { validatePartnerAvailability } = require('../../services/validate-partner-availability');
const { validateStep } = require('../../services/validate-step');
const { buildEntitiesFree } = require('../../services/build-entities');
const { insertEntitiesFree } = require('../../services/insert-entities');
const { insertProcess } = require('../../services/insert-process');

const config = require('../../../../setup/config-current-free.js');

const onboardFree = async () => {
  const { company, user } = config;

  const stepValidation = await validateStep(company.tenant, 'free');
  if (!stepValidation.valid) throw new Error(`Free não executado: ${stepValidation.message}`);

  const validation = await validateProcessFree(company?.tenant, company, user);
  if (!validation.valid) throw new Error(`Free não executado: ${validation.message}`);

  const availabilityTenantAndUserEmail = await validatePartnerAvailability(company.tenant, user.email);
  if (!availabilityTenantAndUserEmail.valid) throw new Error(`Free não executado: ${availabilityTenantAndUserEmail.message}`);

  const entities = await buildEntitiesFree(company, user);
  await insertEntitiesFree(entities.company, entities.user);
  await insertProcess(entities.company.tenant, 'free');
  return true;
};

module.exports = { onboardFree };
