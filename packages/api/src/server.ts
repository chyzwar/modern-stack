
import fastify from 'fastify';
import authenticate from './plugins/authenticate';
import logger from './logger';
import register from './routes/register';
import status from './routes/status';
import facebookOAuth2 from './plugins/facebookOauth';
import googleOAuth2 from './plugins/googleOauth';
import cookie from './plugins/cookie';

import { FastifyServer } from './types/Server';
import stuff from './routes/stuff';


const server: FastifyServer = fastify({
  logger: {
    level: process.env.API_LOG_LEVEL,
    prettyPrint: process.env.NODE_ENV === 'development',
  },
});

/**
 * Register plugins
 */
server.register(cookie);
server.register(authenticate);
server.register(facebookOAuth2);
server.register(googleOAuth2);
/**
 * Register Routes
 */
server.register(register, { prefix: '/api/v1' });
server.register(status, { prefix: '/api/v1' });
server.register(stuff, { prefix: '/api/v1' });

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

export default server;
