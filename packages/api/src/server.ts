
import fastify from 'fastify';
import authenticate from './plugins/authenticate';
import logger from './logger';
import register from './routes/register';
import status from './routes/status';
import facebookOAuth2 from './plugins/facebookOauth';
import googleOAuth2 from './plugins/googleOauth';
import cookie from './plugins/cookie';
import stuff from './routes/stuff';

import { FastifyServer } from './types/Server';

const server: FastifyServer = fastify({
  logger,
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

server.listen({
  port: Number(process.env.API_PORT),
  host: '0.0.0.0',
});

export default server;
