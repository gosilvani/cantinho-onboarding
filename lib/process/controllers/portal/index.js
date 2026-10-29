const fs = require('fs');
const path = require('path');

const { validateProcessPortal } = require('../../services/validate-process');
const { validatePartnerAvailability } = require('../../services/validate-partner-availability');
const { validateStep } = require('../../services/validate-step');
const { buildEntitiesPortal } = require('../../services/build-entities');
const { uploadPartnerLogo } = require('../../services/upload-partner-logo');
const { insertEntitiesPortal } = require('../../services/insert-entities');
const { insertProcess } = require('../../services/insert-process');

const config = require('../../../../setup/config-current-portal.js');

const onboardPortal = async () => {
  const { company, user } = config;
  const validation = await validateProcessPortal(company?.tenant, company, user);
  if (!validation.valid) throw new Error(`Portal não executado: ${validation.message}`);

  const stepValidation = await validateStep(company.tenant, 'portal');
  if (!stepValidation.valid) throw new Error(`Portal não executado: ${stepValidation.message}`);

  const availabilityTenantAndUserEmail = await validatePartnerAvailability(company.tenant, user.email);
  if (!availabilityTenantAndUserEmail.valid) throw new Error(`Portal não executado: ${availabilityTenantAndUserEmail.message}`);

  const entities = await buildEntitiesPortal(company, user);
  await uploadPartnerLogo(entities.company);
  await insertEntitiesPortal(entities.company, entities.user);

  const assetsDirectory = path.resolve(__dirname, '../../../../setup/files/assets');
  for (const file of fs.readdirSync(assetsDirectory)) {
    fs.rmSync(path.join(assetsDirectory, file), { recursive: true, force: true });
  }

  await insertProcess(entities.company.tenant, 'portal');
  return true;
};

module.exports = { onboardPortal };
