const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api:3000',
      changeOrigin: true,
    }),
  );
};

module.exports = proxy;
