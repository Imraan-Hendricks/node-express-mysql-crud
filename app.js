const express = require('express');
const { dbStart } = require('./db/db-main');
const { PORT, NODE_ENV } = require('./config/env');

const main = async () => {
  await dbStart();

  const app = express();

  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  });
};

main();
