const express = require('express');
const { createServer } = require('http');
const { dbStart } = require('./db/db-main');
const { PORT, NODE_ENV } = require('./config/env');
const { shutdown } = require('./middlewares/shutdown');

const main = async () => {
  await dbStart();

  const app = express();
  const server = createServer(app);

  app.use(express.json());

  shutdown(app, server);

  server.listen(PORT, () =>
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
  );
};

main();
