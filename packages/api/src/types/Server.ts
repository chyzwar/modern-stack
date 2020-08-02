import {
  FastifyInstance,
} from 'fastify';

import {
  Server,
} from 'http';

export type FastifyServer = FastifyInstance<Server>;
