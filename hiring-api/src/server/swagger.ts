import '../env';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';

const {
  npm_package_name,
  npm_package_version,
  npm_package_description,
  OPENAPI_ENABLE_RESPONSE_VALIDATION,
} = process.env;

const apiSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: npm_package_name,
      description: npm_package_description,
      version: npm_package_version,
    },
    servers: [{ url: '/api/v1' }],
  },
  apis: [
    path.resolve(__dirname, './routes/index*'),
    path.resolve(__dirname, './routes/**/router*'),
  ],
});

export default function (app) {
  app.use('/api-explorer', swaggerUI.serve, swaggerUI.setup(apiSpec));
  app.use(
    OpenApiValidator.middleware({
      // @ts-ignore
      apiSpec,
      validateResponses: OPENAPI_ENABLE_RESPONSE_VALIDATION === 'true',
      ignorePaths: /.*\/(spec|auth|jobs|users)(\/|$)/,
    })
  );
}
