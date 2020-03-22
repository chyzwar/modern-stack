import axios from 'axios';
import fp from 'fastify-plugin';
import oauthPlugin from 'fastify-oauth2';
import User from '../models/User';
import { GoogleProfile, Provider } from '../types/Oauth';

const {
  env: {
    // API_HOST,
    API_PORT,
    API_PROTOCOL,

    GOOGLE_ID,
    GOOGLE_SECRET,
  },
} = process;


const googleOAuth2 = fp(async (fastify) => {
  fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['email'],
    credentials: {
      client: {
        id: GOOGLE_ID,
        secret: GOOGLE_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/v1/login/google',
    callbackUri: `${API_PROTOCOL}://localhost:${API_PORT}/api/v1/login/google/callback`,
  });

  fastify.get('/api/v1/login/google/callback', async function handler(request, reply) {
    const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const { data } = await axios.get<GoogleProfile>('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const user = await User.createFromOAuth({
      provider: Provider.Google,
      providerId: data.id,
      name: data.name,
      email: data.email,
    });

    reply
      .redirect(`${request.headers.referer}?token=${this.jwt.sign(user)}`);
  });
});

export default googleOAuth2;
