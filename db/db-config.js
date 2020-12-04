const mysql = require('mysql');
const { DBHOST, DBUSER, DBPASSWORD } = require('../config/env');

let connection = null;

exports.connect = () =>
  new Promise((resolve, reject) => {
    if (connection) {
      console.log('DB connection already established');
      return resolve();
    }

    const conn = mysql.createConnection({
      host: DBHOST,
      user: DBUSER,
      password: DBPASSWORD,
    });

    conn.connect((err) => {
      if (err) return reject(`DB Connection Error`);

      console.log(`Mysql Connected: ${DBHOST}`);
      connection = conn;
      resolve();
    });
  });

exports.getConnection = () => connection;

exports.closeConnection = () =>
  new Promise((resolve, reject) => {
    if (!connection) {
      console.log('No established connection to close');
      return resolve();
    }

    connection.end((err) => {
      if (err) return reject('Failed to close DB connection');

      connection = null;
      console.log('DB connection closed');
      resolve();
    });
  });
