const Ajv = require('ajv');
const ajvFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');
const companySchema = require('../../schemas/config-current-company.json');
const freeCompanySchema = require('../../schemas/config-free-company.json');
const portalCompanySchema = require('../../schemas/config-portal-company.json');
const userSchema = require('../../schemas/config-current-user.json');
const themeSchema = require('../../schemas/config-current-theme.json');

const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);
ajv.addSchema(companySchema);

const verifyImage = (fileName, folderPath) => {
  const fullPath = path.join(folderPath, fileName);
  return fs.existsSync(fullPath);
}

const validateData = (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    return { valid: true };
  }

  const formattedErrors = validate.errors
    .map(err => (`path: ${err.instancePath || err.schemaPath} - message: ${err.message}`));
  return {
    valid: false,
    errors: formattedErrors.join('\n')
  };
}

const validateProcessComplete = async (tenant, company, user, theme) => {
  if (!tenant || !company || !user || !theme) {
    return { valid: false, message: 'É necessário que o arquivo de configuração tenha todas as entidades: company, user, theme e que o tenant esteja na configuração de company' };
  }
  const resultValidateCompanyData = validateData(companySchema, company);
  if (!resultValidateCompanyData.valid) {
    return { valid: false, message: `Dados inválidos do company \n${resultValidateCompanyData.errors}` }
  }
  const resultValidateUserData = validateData(userSchema, user);
  if (!resultValidateUserData.valid) {
    return { valid: false, message: `Dados inválidos do user \n${resultValidateUserData.errors}` }
  }
  const resultValidateThemeData = validateData(themeSchema, theme);
  if (!resultValidateThemeData.valid) {
    return { valid: false, message: `Dados inválidos do theme \n${resultValidateThemeData.errors}` }
  }
  const validateFavicon = verifyImage(theme.faviconFileName, path.join(__dirname, '../../../setup/files'));
  if (!validateFavicon || theme.faviconFileName !== 'favicon.ico') {
    return { valid: false, message: 'O favicon não foi encontrado ou não é o arquivo correto' };
  }
  const validateLogo = verifyImage(theme.logoFileName, path.join(__dirname, '../../../setup/files/assets'));
  if (!validateLogo) {
    return { valid: false, message: 'A logo não foi encontrado' };
  }
  const validateHomeHeroImage = verifyImage(theme.contents.home.heroImageFileName, path.join(__dirname, '../../../setup/files/assets'));
  if (!validateHomeHeroImage) {
    return { valid: false, message: 'A imagem do hero da home não foi encontrado' };
  }
  const validateAboutHeroImage = verifyImage(theme.contents.about.heroImageFileName, path.join(__dirname, '../../../setup/files/assets'));
  if (!validateAboutHeroImage) {
    return { valid: false, message: 'A imagem do hero da about não foi encontrado' };
  }
  return { valid: true };
}

const validateProcessFree = async (tenant, company, user) => {
  if (!tenant || !company || !user) {
    return { valid: false, message: 'É necessário informar company, user e o tenant da company.' };
  }
  const companyValidation = validateData(freeCompanySchema, company);
  if (!companyValidation.valid) {
    return { valid: false, message: `Dados inválidos do company \n${companyValidation.errors}` };
  }
  const userValidation = validateData(userSchema, user);
  if (!userValidation.valid) {
    return { valid: false, message: `Dados inválidos do user \n${userValidation.errors}` };
  }
  return { valid: true };
};

const validateProcessPortal = async (tenant, company, user) => {
  if (!tenant || !company || !user) {
    return { valid: false, message: 'É necessário informar company, user e o tenant da company.' };
  }
  const companyValidation = validateData(portalCompanySchema, company);
  if (!companyValidation.valid) {
    return { valid: false, message: `Dados inválidos do company \n${companyValidation.errors}` };
  }
  const userValidation = validateData(userSchema, user);
  if (!userValidation.valid) {
    return { valid: false, message: `Dados inválidos do user \n${userValidation.errors}` };
  }
  const dnsValidation = validateData({ type: 'string', format: 'hostname' }, process.env.DNS_MEDIA_CDN);
  if (!dnsValidation.valid) {
    return { valid: false, message: 'DNS_MEDIA_CDN deve informar o domínio da CDN de mídia, sem protocolo, porta ou caminho.' };
  }
  const logoPath = path.join(__dirname, '../../../setup/files/assets', company.logoFileName);
  if (!fs.existsSync(logoPath) || !fs.statSync(logoPath).isFile()) {
    return { valid: false, message: 'A logo não foi encontrada ou não é um arquivo válido em setup/files/assets.' };
  }
  return { valid: true };
};

module.exports = { validateProcessComplete, validateProcessFree, validateProcessPortal };
