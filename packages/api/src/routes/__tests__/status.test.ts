import fastify from '../../server';
import sequelize from '../../sequelize';

describe('GET `/status` route', () => {
  afterAll(() => fastify.close());

  it('should respond with status connected true', (done) => {
    sequelize.authenticate = jest.fn().mockResolvedValueOnce(true);

    fastify.inject({
      method: 'GET',
      url: '/api/v1/status',
    }, (err, response) => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.json()).toEqual({
        uptime: expect.any(Number),
        db: {
          connected: true,
        },
      });
      done();
    });
  });

  it('should respond with status error message for db', (done) => {
    sequelize.authenticate = jest.fn().mockRejectedValueOnce(new Error('Failed to auth'));

    fastify.inject({
      method: 'GET',
      url: '/api/v1/status',
    }, (err, response) => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.json()).toEqual({
        uptime: expect.any(Number),
        db: {
          connected: false,
        },
      });
      done();
    });
  });
});
