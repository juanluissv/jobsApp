import '../env';
import logger from '../logger';

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_LOGGING,
  DB_URL,
  NODE_ENV,
} = process.env;

export const dialect = 'postgres';
export const username = DB_USER;
export const password = DB_PASSWORD;
export let database = DB_NAME;
export const host = DB_HOST;
export const port = DB_PORT;
export const logging = DB_LOGGING === 'true' && ((sql) => logger.info(sql));
export const define = { underscored: true };

switch (NODE_ENV) {
  case 'production':
    break;
  case 'development':
    break;
  case 'test':
    database = `${DB_NAME}_test`;
    break;
}

export const url = DB_URL;
