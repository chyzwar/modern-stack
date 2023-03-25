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
import localProxy from "./plugins/localProxy.js";
import staticFiles from "./plugins/staticFiles.js";

export const createServer = async(): Promise<FastifyServer> => {
  const server: FastifyServer = fastify({
    logger,
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

    if (process.env.NODE_ENV === "development") {
      await server.register(localProxy);
    }
    else {
      await server.register(staticFiles);
    }
  
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