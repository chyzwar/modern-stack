import fastify from 'fastify'

import { 
  Server, 
  IncomingMessage, 
  ServerResponse 
} from 'http'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV === 'development',
  },
});

server.listen(process.env.PORT);
