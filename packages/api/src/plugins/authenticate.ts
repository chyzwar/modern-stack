import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';

import {
  ServerResponse,
} from 'http';

import {
  FastifyReply,
  FastifyRequest,
} from 'fastify';

const authenticate = fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: 'supersecret-12345',
  });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

export default authenticate;
