import type {RouteShorthandOptionsWithHandler} from "fastify";
import type {FastifyServer} from "../types/Server.js";
import sequelize from "../sequelize.js";
import logger from "../logger.js";

const status = (server: FastifyServer, _: unknown, done: Function): void => {
  const route: RouteShorthandOptionsWithHandler = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            uptime: {type: "number"},
            db: {
              type: "object",
              properties: {
                connected: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
    },
    handler: async(_request, reply) => {
      let connected: boolean | string = true;
      try {
        await sequelize.authenticate();
      }
      catch (error) {
        logger.error({error}, "Failed to connect db");
        connected = false;
      }

      return reply.send({
        uptime: process.uptime(),
        db: {
          connected,
        },
      });
    },
  };
  server.get("/status", route);
  done();
};

export default status;
