import './env';
import pino from 'pino';

const { NODE_ENV, npm_package_name, LOG_LEVEL } = process.env;

export default pino({
  name: npm_package_name,
  level: LOG_LEVEL || 'info',
  enabled: ['development', 'production'].includes(NODE_ENV),
});
