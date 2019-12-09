const proxy = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(proxy('/account', {
    target: 'http://localhost:8000',
  }));
  app.use(proxy('/loan', {
    target: 'http://localhost:8000',
  }));
  app.use(proxy('/review', {
    target: 'http://localhost:8000',
  }));
  app.use(proxy('/ws', {
    target: 'http://localhost:8000',
  }));
};
