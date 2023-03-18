import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

const authenticate = fp(async(fastify) => {
  await fastify.register(fastifyJwt, {
    secret: "supersecret-12345asasasasa",
    cookie: {
      cookieName: "Token",
      signed: false,
    },
  });

  fastify.decorate("authenticate", async(request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    }
    catch (err) {
      reply.send(err);
    }
  });
});

export default authenticate;
