import { RouteShorthandOptionsWithHandler } from 'fastify';
import { FastifyServer } from '../types/Server';

const stuff = async (fastify: FastifyServer): Promise<void> => {
  const route: RouteShorthandOptionsWithHandler = {
    preValidation: [fastify.authenticate],
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => reply.send([
      { name: 'Test1' },
      { name: 'Test2' },
    ]),
  };

  fastify.get('/stuff', route);
};

export default stuff;
