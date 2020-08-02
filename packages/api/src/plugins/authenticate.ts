import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';

import {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

const authenticate = fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: 'supersecret-12345',
    cookie: {
      cookieName: 'Token',
    },
  });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

export default authenticate;
