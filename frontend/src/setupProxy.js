const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/account', { target: 'http://localhost:8000' }));
  app.use(proxy('/loan', { target: 'http://localhost:8000' }));
}
