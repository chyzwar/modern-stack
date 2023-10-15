import type {RouteShorthandOptionsWithHandler} from "fastify";
import type {FastifyServer} from "../types/Server.js";

const stuff = (fastify: FastifyServer, _: unknown, done: Function): void => {
  const route: RouteShorthandOptionsWithHandler = {
    preValidation: [fastify.authenticate],
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
          },
        },
      },
    },
    handler: async(_request, reply) => reply.send([
      {name: "Test1"},
      {name: "Test2"},
    ]),
  };

  fastify.get("/stuff", route);
  done();
};

export default stuff;
