import {
  FastifyInstance,
} from 'fastify';

import {
  Server,
  IncomingMessage,
  ServerResponse,
} from 'http';

export type FastifyServer = FastifyInstance<Server, IncomingMessage, ServerResponse>;
