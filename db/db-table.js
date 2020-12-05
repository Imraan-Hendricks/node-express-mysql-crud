const { dbQuery } = require('./db-utils');

const compileSql = (tblName, sqlFields) => {
  let sql = `CREATE TABLE IF NOT EXISTS ${tblName}`;
  let count = 0;
  let length = sqlFields.length;

  sqlFields.forEach((field) => {
    if (count === 0) sql = `${sql} (`;
    sql = `${sql}${field}`;
    if (count < length - 1) sql = `${sql}, `;
    else sql = `${sql})`;
    count++;
  });

  return sql;
};

exports.createTable = async (tblName, sqlFields) => {
  try {
    const sql = compileSql(tblName, sqlFields);

    const data = await dbQuery(sql);
    if (data.warningCount > 0) return console.log(`${tblName} table ready`);

    console.log(`${tblName} table created`);
  } catch (err) {
    throw err;
  }
};
