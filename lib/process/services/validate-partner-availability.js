const database = require('../../database');

const collation = { locale: 'en', strength: 2 };

const validatePartnerAvailability = async (tenant, email) => {
  const company = await database.getCollection('companies').findOne(
    { tenant }, { collation }
  );
  if (company) return { valid: false, message: 'Já existe uma empresa com este tenant.' };

  const user = await database.getCollection('users').findOne(
    { email }, { collation }
  );
  if (user) return { valid: false, message: 'Já existe um usuário com este e-mail.' };

  return { valid: true };
};

module.exports = { validatePartnerAvailability };
