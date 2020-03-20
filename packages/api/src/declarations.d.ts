import { OAuth2Namespace } from 'fastify-oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    facebookOAuth2: OAuth2Namespace;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      API_PORT: string;
      API_PROTOCOL: string;
      API_HOST: string;

      FACEBOOK_ID: string;
      FACEBOOK_SECRET: string;

      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
    }
  }
}

export {};
