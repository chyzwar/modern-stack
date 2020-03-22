
import fastify from 'fastify';
import authenticate from './plugins/authenticate';
import logger from './logger';
import register from './routes/register';
import status from './routes/status';
import facebookOAuth2 from './plugins/facebookOauth';
import googleOAuth2 from './plugins/googleOauth';

import { FastifyServer } from './types/Server';


const server: FastifyServer = fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV === 'development',
  },
});

/**
 * Register plugins
 */
server.register(authenticate);
server.register(facebookOAuth2);
server.register(googleOAuth2);
/**
 * Register Routes
 */
server.register(register, { prefix: '/api/v1' });
server.register(status, { prefix: '/api/v1' });
/**
 * Handle exceptions
 */
process.on('uncaughtException', (error) => {
  logger.error({ error }, 'uncaughtException');
});

process.on('unhandledRejection', (signal) => {
  logger.error({ signal }, 'unhandledRejection');
});


server.listen(
  Number(process.env.API_PORT),
  process.env.API_HOST,
);
