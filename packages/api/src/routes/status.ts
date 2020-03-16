import { RouteShorthandOptions } from "fastify";
import { FastifyServer } from "../types/Server";
import sequelize from "../sequelize";

const status = async(server: FastifyServer): Promise<void> => {
  const route: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            uptime: { type: 'number' },
            db: {
              type: "object",
              properties: {
                connected: { 
                  type: 'boolean'
                }
              }
            }
          }
        }
      }
    },
    handler: async (request, reply) => {
      let connected: boolean | string = false
      try {
        await sequelize.authenticate();
      } catch(error) {
        connected = error.message;
      }

      return reply.send({ 
        uptime: process.uptime(),
        db: {
          connected,
        },
      });
    }
  }
  server.get("/status", route);
}



export default status;