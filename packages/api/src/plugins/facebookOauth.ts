import fp from 'fastify-plugin';
import oauthPlugin from 'fastify-oauth2';

const {
  env: {
    // API_HOST,
    API_PORT,
    API_PROTOCOL,

    FACEBOOK_ID,
    FACEBOOK_SECRET,
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
    callbackUri: `${API_PROTOCOL}://localhost:${API_PORT}/api/login/facebook/callback`,
  });

  fastify.get('/api/v1/login/facebook/callback', async function handler(request, reply) {
    const token = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    reply.send({ access_token: token.access_token });
  });
});

export default facebookOAuth2;
