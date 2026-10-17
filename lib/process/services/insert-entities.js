const database = require('../../database');

const companyCollection = 'companies';
const userCollection = 'users';
const themeCollection = 'themes';

const insertEntity = (collectionName, entityData) => database.getCollection(collectionName).insertOne(entityData);

const insertEntitiesComplete = async (company, user, theme) => {
  await insertEntity(companyCollection, company);
  await insertEntity(userCollection, user);
  await insertEntity(themeCollection, theme);
};

const insertEntitiesFree = async (company, user) => {
  await insertEntity(companyCollection, company);
  await insertEntity(userCollection, user);
};

const insertEntitiesPortal = async (company, user) => {
  await insertEntity(companyCollection, company);
  await insertEntity(userCollection, user);
};

module.exports = { insertEntitiesComplete, insertEntitiesFree, insertEntitiesPortal };
