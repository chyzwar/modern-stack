import type {RouteShorthandOptionsWithHandler} from "fastify";
import type {FastifyServer} from "../types/Server.js";

const register = (server: FastifyServer, _: unknown, done: Function): void => {
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
    handler(__, reply) {
      return reply.send({hello: "world"});
    },
  };

  server.get("/register", route);
  done();
};

export default register;
