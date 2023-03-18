import type {RouteShorthandOptionsWithHandler} from "fastify";
import type {FastifyServer} from "../types/Server.js";

const register = (server: FastifyServer): void => {
  const route: RouteShorthandOptionsWithHandler = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello: {type: "string"},
          },
        },
      },
    },
    handler(request, reply) {
      reply.send({hello: "world"});
    },
  };

  server.get("/register", route);
};

export default register;
