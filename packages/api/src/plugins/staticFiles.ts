

import fp from "fastify-plugin";
import staticFiles from "@fastify/static";
import {join} from "path";

const statics = fp(async(server) => {
  server.register(staticFiles, {
    root: join(__dirname, "public"),
    prefix: "/",
  });
});

export default statics;