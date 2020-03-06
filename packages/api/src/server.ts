import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'


const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  
})

server.listen(() => {
  console.log('server started')
})
