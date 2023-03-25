import logger from "./logger.js";
import {createServer} from "./server.js";

/**
 * Handle exceptions
 */
process.on("uncaughtException", (error) => {
  logger.error({error}, "uncaughtException");
});

const server = await createServer();

try {
  const address = await server.listen({
    host: "0.0.0.0",
    port: Number(process.env.API_PORT),
  }); 
  logger.info(`Server listening in ${address}`);
}
catch (error) {
  logger.error(error, "Server fail to listen");
}
