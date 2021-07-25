const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://0.0.0.0:3000',
      changeOrigin: true,
    }),
  );
};

module.exports = proxy;
