import fastify from '../../server';

describe('GET `/status` route', () => {
  afterAll(() => fastify.close());

  it('should respond with status', (done) => {
    fastify.inject({
      method: 'GET',
      url: '/api/v1/status',
    }, (err, response) => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.json()).toEqual({
        uptime: expect.any(Number),
        db: {
          connected: expect.any(Boolean),
        },
      });
      done();
    });
  });
});
