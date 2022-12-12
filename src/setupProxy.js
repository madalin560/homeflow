const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  // TODO: Add config file for configuring dev environment
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080/',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};
