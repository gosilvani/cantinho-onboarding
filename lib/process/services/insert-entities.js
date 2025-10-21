const database = require('../../database');

const companyCollection = 'companies';
const userCollection = 'users';
const themeCollection = 'themes';

const insertEntity = (collectionName, entityData) => database.getCollection(collectionName).insertOne(entityData);

const insertEntities = async (company, user, theme) => {
  await insertEntity(companyCollection, company);
  await insertEntity(userCollection, user);
  await insertEntity(themeCollection, theme);
}

module.exports = { insertEntities };
