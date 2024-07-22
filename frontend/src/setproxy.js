const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Your API routes
    createProxyMiddleware({
      target: 'https://tams-resource-sf-sig.7022ae40757f8d53295a57619de9b364.r2.cloudflarestorage.com',
      changeOrigin: true,
    })
  );
};