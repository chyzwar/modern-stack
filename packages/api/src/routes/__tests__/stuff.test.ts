import fastify from '../../server';

describe('GET `/status` route', () => {
  afterAll(() => fastify.close());

  it('should respond with 401 if not authenticated', (done) => {
    fastify.inject({
      method: 'GET',
      url: '/api/v1/stuff',
    }, (err, response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});
