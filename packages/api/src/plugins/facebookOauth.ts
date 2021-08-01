import axios from 'axios';
import fp from 'fastify-plugin';
import oauthPlugin from 'fastify-oauth2';
import { randomBytes } from 'crypto';
import { FastifyRequest } from 'fastify';

import { Role } from '@project/common';
import User from '../models/User';
import { FacebookProfile, Provider } from '../types/Oauth';

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
    FACEBOOK_ID,
    FACEBOOK_SECRET,

    API_HOST,
    API_PORT,
    API_PROTOCOL,
  },
} = process;

const facebookOAuth2 = fp(async (fastify) => {
  fastify.register(oauthPlugin, {
    name: 'facebookOAuth2',
    scope: ['email'],
    credentials: {
      client: {
        id: FACEBOOK_ID,
        secret: FACEBOOK_SECRET,
      },
      auth: oauthPlugin.FACEBOOK_CONFIGURATION,
    },
    startRedirectPath: '/api/v1/login/facebook',
    callbackUri: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api/v1/login/facebook/callback`,
    checkStateFunction,
    generateStateFunction,
  });

  fastify.get('/api/v1/login/facebook/callback', async function handler(request, reply) {
    const accessToken = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const { data } = await axios.get<FacebookProfile>('https://graph.facebook.com/v6.0/me', {
      params: {
        fields: 'id,name,email',
      },
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    });

    const user = await User.createFromOAuth({
      provider: Provider.Facebook,
      providerId: data.id,
      name: data.name,
      email: data.email,
      role: Role.Guest,
    });

    const {
      origin,
      pathname,
    } = new URL((request.query as any)?.state.split('_').shift());

    const token = this.jwt.sign(user.toJwt());

    reply.redirect(`${origin}${pathname}?token=${token}`);
  });
});

export default facebookOAuth2;
