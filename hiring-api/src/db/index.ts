// @ts-nocheck
// /* eslint-disable */
import Sequelize from 'sequelize';
import * as config from './config';
import models, { MODELS } from './models';
import enums from './models/enums';

export const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config);

interface DB extends MODELS {
  sequelize: any;
  Sequelize: any;
  enums: any;
}

const db: DB = {
  sequelize,
  Sequelize,
  enums,
};

for (const modelName in models) {
  db[modelName] = models[modelName](sequelize);
}

for (const modelName in models) {
  if (db[modelName].associate) db[modelName].associate(db);
}

export default db;
