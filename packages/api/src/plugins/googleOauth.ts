import axios from "axios";
import fp from "fastify-plugin";
import {fastifyOauth2} from "@fastify/oauth2";
import {Role} from "@project/common";
import User from "../models/User.js";
import type {GoogleProfile} from "../types/Oauth.js";
import {Provider} from "../types/Oauth.js";

const {
  env: {
    GOOGLE_ID,
    GOOGLE_SECRET,

    API_HOST,
    API_PORT,
    API_PROTOCOL,
  },
} = process;

const googleOAuth2 = fp(async(fastify) => {
  await fastify.register(fastifyOauth2, {
    name: "googleOAuth2",
    scope: ["email profile openid"],
    credentials: {
      client: {
        id: GOOGLE_ID,
        secret: GOOGLE_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/api/v1/login/google",
    callbackUri: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api/v1/login/google/callback`,
  });

  fastify.get("/api/v1/login/google/callback", async function handler(this, request, reply) {
    const {token} = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const {data} = await axios.get<GoogleProfile>("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const user = await User.createFromOAuth({
      provider: Provider.Google,
      providerId: data.id,
      name: data.given_name,
      email: data.email,
      role: Role.Guest,
    });

    const jwtToken = this.jwt.sign(user.toJwt());

    void reply
      .setCookie("Token", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .redirect(`/?token=${jwtToken}`);
  });
});

export default googleOAuth2;
