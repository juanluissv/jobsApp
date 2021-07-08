import fs from 'fs';
import sequelizeErd from 'sequelize-erd';
import db from './index';

sequelizeErd({ source: db.sequelize, engine: 'dot' }).then((erd) =>
  fs.writeFile('erd.svg', erd, (err) => err && console.error(err))
);
