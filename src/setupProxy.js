const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  // TODO: Add config file for configuring dev environment
  app.use(
    '/api',
    createProxyMiddleware({
      pathRewrite: {
        '^/api': ''
      },
      target: 'http://localhost:6000/',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};
