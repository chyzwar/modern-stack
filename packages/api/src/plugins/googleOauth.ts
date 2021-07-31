import axios from 'axios';
import fp from 'fastify-plugin';
import oauthPlugin from 'fastify-oauth2';
import { FastifyRequest } from 'fastify';
import { randomBytes } from 'crypto';

import { Role } from '@project/common';
import User from '../models/User';
import { GoogleProfile, Provider } from '../types/Oauth';

const defaultState = randomBytes(10).toString('hex');

function generateStateFunction(request: FastifyRequest) {
  return `${request.headers.referer}_${defaultState}`;
}

function checkStateFunction(state: string, callback: Function) {
  return state.endsWith(defaultState)
    ? callback()
    : callback(new Error('Invalid state'));
}

const {
  env: {
    GOOGLE_ID,
    GOOGLE_SECRET,
  },
} = process;

const googleOAuth2 = fp(async (fastify) => {
  fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['email profile openid'],
    credentials: {
      client: {
        id: GOOGLE_ID,
        secret: GOOGLE_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/v1/login/google',
    callbackUri: '/api/v1/login/google/callback',
    checkStateFunction,
    generateStateFunction,
  });

  fastify.get('/api/v1/login/google/callback', async function handler(request, reply) {
    const accessToken = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const { data } = await axios.get<GoogleProfile>('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    });

    const user = await User.createFromOAuth({
      provider: Provider.Google,
      providerId: data.sub,
      name: data.name,
      email: data.email,
      role: Role.Guest,
    });

    const {
      origin,
      pathname,
    } = new URL((request.query as any)?.state.split('_').shift());

    const token = this.jwt.sign(user.toJwt());

    reply
      .setCookie('Token', token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .redirect(`${origin}${pathname}?token=${token}`);
  });
});

export default googleOAuth2;
