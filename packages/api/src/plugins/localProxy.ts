

import fp from "fastify-plugin";
import proxy from "@fastify/http-proxy";

const localProxy = fp(async(fastify) => {
  await fastify.register(proxy, {
    upstream: "http://ui:4000",
    http2: false,
  });
});

export default localProxy;