import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";

const cookie = fp(async(fastify) => {
  await fastify.register(fastifyCookie, {
    secret: process.env.API_COOKIE_SECRET,
  });
});

export default cookie;
