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

/**
 * Handle exceptions
 */
process.on("uncaughtException", (error) => {
  logger.error({error}, "uncaughtException");
});

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
  
  await server.listen({
    host: "0.0.0.0",
    port: Number(process.env.API_PORT),
  }); 
}
catch (e) {
  console.log(e);
  logger.error(e, "Failed to init server");
  process.exit(1);
}

export default server;
