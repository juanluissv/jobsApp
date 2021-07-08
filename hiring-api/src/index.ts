import './env';
import db from './db';
import app from './server';

const { NODE_ENV, PORT = 3001, DB_FORCE_SYNC } = process.env;

(NODE_ENV === 'development'
  ? db.sequelize.sync({ force: DB_FORCE_SYNC === 'true' })
  : Promise.resolve()
).then(() =>
  app.listen(PORT, () => console.log(`Server ready at port: ${PORT}`))
);
