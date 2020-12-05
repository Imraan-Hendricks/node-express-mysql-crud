const { connect } = require('./db-config');
const { createDb, useDb } = require('./db-schema');
const { createTable } = require('./db-table');
const { DBNAME } = require('../config/env');

exports.dbStart = async () => {
  try {
    console.log('Initializing database');

    await connect();
    await createDb(DBNAME);
    await useDb(DBNAME);
    await createTable('books', [
      'id VARCHAR(255) NOT NULL PRIMARY KEY',
      'author VARCHAR(255) NOT NULL',
      'title VARCHAR(255) NOT NULL',
      'description TEXT NOT NULL',
    ]);

    console.log('Initialization complete');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
