import db from '../src/db';
import dbMock from './db.mock.json';

export const mochaGlobalSetup = () =>
  Object.entries(dbMock)
    .reduce(
      (promise, [model, records]) =>
        promise
          .then(() => db[model].bulkCreate(records))
          .then((r) => (dbMock[model] = JSON.parse(JSON.stringify(r)))),
      db.sequelize.sync({ force: true })
    )
    .then(() => console.log('MOCKUP COMPLETED'));
