import type {FastifyBaseLogger} from "fastify";
import fastify from "fastify";
import authenticate from "./plugins/authenticate.js";
import logger from "./logger.js";
import register from "./routes/register.js";
import status from "./routes/status.js";
import facebookOAuth2 from "./plugins/facebookOauth.js";
import googleOAuth2 from "./plugins/googleOauth.js";
import cookie from "./plugins/cookie.js";
import stuff from "./routes/stuff.js";
import type {FastifyServer} from "./types/Server.js";

export const createServer = async(): Promise<FastifyServer> => {
  const server: FastifyServer = fastify({
    logger: logger as FastifyBaseLogger,
  });

  try {

    /**
     * Register plugins
     */
    await server.register(cookie);
    await server.register(authenticate);
    await server.register(facebookOAuth2);
    await server.register(googleOAuth2);


    /**
   * Register Routes
   */
    await server.register(register, {prefix: "/api/v1"});
    await server.register(status, {prefix: "/api/v1"});
    await server.register(stuff, {prefix: "/api/v1"});
  
    server.after((err: Error | undefined) => {
      if (err) {
        logger.error(err, "Handle errors after middleware");
        process.exit(1); 
      }
    });
    server.ready((err: Error | undefined) => {
      if (err) {
        logger.error(err, "Handle errors ready middleware");
        process.exit(1);
      }
    });
    
    return server;
  }
  catch (error) {
    logger.error(error, "Failed to init server");
    process.exit(1);
  }
};