import { RouteShorthandOptions } from "fastify";
import { FastifyServer } from "../types/Server";


const register = async(server: FastifyServer) => {
  const route: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    handler (request, reply) {
      reply.send({ hello: 'world' })
    }
  }

  server.get("/register", route);
}



export default register;