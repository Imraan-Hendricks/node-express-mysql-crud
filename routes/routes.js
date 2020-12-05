exports.routes = (app) => {
  const { ApiRouter } = require('./api/api-router');

  app.use('/api', ApiRouter);
};
