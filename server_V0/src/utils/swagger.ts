import { Options } from 'swagger-jsdoc';
import version from '../../package.json';
const options: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API for SPIT website',
      version: version.version,
      description: 'API for SPIT'
    },
    servers: [
      {
        url: 'http://localhost:3302',
        description: 'Docker server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Dev server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  },
  apis: ['./**/*.route.ts']
};

export default options;
