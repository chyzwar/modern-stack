import axios from "axios";
import fp from "fastify-plugin";
import {fastifyOauth2} from "@fastify/oauth2";
import {Role} from "@project/common";
import User from "../models/User.js";
import type {FacebookProfile} from "../types/Oauth.js";
import {Provider} from "../types/Oauth.js";

const {
  env: {
    FACEBOOK_ID,
    FACEBOOK_SECRET,

    API_HOST,
    API_PORT,
    API_PROTOCOL,
  },
} = process;

const facebookOAuth2 = fp(async(fastify) => {
  await fastify.register(fastifyOauth2, {
    name: "facebookOAuth2",
    scope: ["email"],
    credentials: {
      client: {
        id: FACEBOOK_ID,
        secret: FACEBOOK_SECRET,
      },
      auth: fastifyOauth2.FACEBOOK_CONFIGURATION,
    },
    startRedirectPath: "/api/v1/login/facebook",
    callbackUri: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api/v1/login/facebook/callback`,
  });

  fastify.get("/api/v1/login/facebook/callback", async function handler(this, request, reply) {
    const accessToken = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const {data} = await axios.get<FacebookProfile>("https://graph.facebook.com/v6.0/me", {
      params: {
        fields: "id,name,email",
      },
      headers: {
        Authorization: `Bearer ${accessToken.token.access_token}`,
      },
    });

    const user = await User.createFromOAuth({
      provider: Provider.Facebook,
      providerId: data.id,
      name: data.name,
      email: data.email,
      // @ts-expect-error TODO:
      role: Role.Guest,
    });
    const token = this.jwt.sign(user.toJwt());

    void reply.redirect(`/?token=${token}`);
  });
});

export default facebookOAuth2;
