const express = require('express');
const { PORT, NODE_ENV } = require('./config/env');

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
