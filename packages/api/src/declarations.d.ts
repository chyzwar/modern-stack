import { OAuth2Namespace } from 'fastify-oauth2';
import { FastifyMiddleware } from 'fastify';


declare module 'fastify' {
  interface FastifyInstance {
    authenticate: FastifyMiddleware;
    facebookOAuth2: OAuth2Namespace;
    googleOAuth2: OAuth2Namespace;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';


      API_PORT: string;
      API_PROTOCOL: string;
      API_HOST: string;
      API_COOKIE_SECRET: string;
      API_LOG_PRETTY: 'true' | 'false';
      API_LOG_LEVEL:
      |'fatal'
      | 'error'
      | 'warn'
      | 'info'
      | 'debug'
      | 'trace'
      | 'silent';

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

export {};
