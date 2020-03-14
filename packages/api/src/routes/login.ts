import  fp from "fastify-plugin";
import { FastifyServer } from "types/Server";

export default fp(async (server: FastifyServer, opts, next) => {
  server.route({
    url: "/status",
    logLevel: "warn",
    method: ["GET", "HEAD"],
    
    handler: async (request, reply) => {
      return reply.send({ date: new Date(), works: true });
    }
  });
  next();
});