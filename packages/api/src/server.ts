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

const server: FastifyServer = fastify({
  logger,
});

/**
 * Register plugins
 */
server.register(cookie);
server.register(authenticate);
server.register(facebookOAuth2);
server.register(googleOAuth2);

/**
 * Register Routes
 */
server.register(register, {prefix: "/api/v1"});
server.register(status, {prefix: "/api/v1"});
server.register(stuff, {prefix: "/api/v1"});

/**
 * Handle exceptions
 */
process.on("uncaughtException", (error) => {
  logger.error({error}, "uncaughtException");
});

if (process.env.NODE_ENV === "development") {
  server.register(localProxy);
}
else {
  server.register(staticFiles);
}

server.listen({
  host: "0.0.0.0",
  port: Number(process.env.API_PORT),
});

export default server;
