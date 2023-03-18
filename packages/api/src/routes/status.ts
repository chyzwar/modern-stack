import type {RouteShorthandOptionsWithHandler} from "fastify";
import type {FastifyServer} from "../types/Server.js";
import sequelize from "../sequelize.js";
import logger from "../logger.js";

const status = async(server: FastifyServer): Promise<void> => {
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
    handler: async(request, reply) => {
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
};

export default status;
