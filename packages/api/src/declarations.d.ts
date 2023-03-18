import type {OAuth2Namespace} from "@fastify/oauth2";
import type {preValidationHookHandler} from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: preValidationHookHandler;
    facebookOAuth2: OAuth2Namespace;
    googleOAuth2: OAuth2Namespace;
  }
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";

      API_PORT: string;
      API_PROTOCOL: string;
      API_HOST: string;
      API_COOKIE_SECRET: string;
      API_LOG_PRETTY: "false" | "true";
      API_LOG_LEVEL:
      "debug" | "error" | "fatal" | "info" | "silent" | "trace" | "warn";

      FACEBOOK_ID: string;
      FACEBOOK_SECRET: string;

      GOOGLE_ID: string;
      GOOGLE_SECRET: string;

      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
    }
  }
}


