const { dbQuery } = require('./db-utils');

exports.createDb = async (dbName) => {
  try {
    const sql = `CREATE DATABASE IF NOT EXISTS ${dbName}`;

    const data = await dbQuery(sql, [dbName]);
    if (data.warningCount > 0) return console.log(`${dbName} database ready`);

    console.log(`${dbName} database created`);
  } catch (err) {
    throw err;
  }
};

exports.getCurrentDbName = async () => {
  try {
    const sql = 'SELECT DATABASE() AS dbName';
    const data = await dbQuery(sql);

    const dbName = data[0].dbName;
    if (!dbName) throw 'No database currently selected';

    return dbName;
  } catch (err) {
    throw err;
  }
};

exports.useDb = async (dbName) => {
  try {
    const sql = `USE ${dbName}`;
    await dbQuery(sql, [dbName]);
    console.log(`${dbName} database selected`);
  } catch (err) {
    throw err;
  }
};
