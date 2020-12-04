const { getConnection } = require('./db-config');
const { v4: uuidv4 } = require('uuid');

exports.dbErr = [
  {
    location: 'db',
    param: '',
    msg: 'an error has occured',
    value: '',
  },
];

exports.dbQuery = (sql, values) =>
  new Promise((resolve, reject) => {
    getConnection().query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

exports.useOrderBy = (sort) => {
  let orderBy = '';
  if (!sort || sort.length === 0) return orderBy;

  orderBy = 'ORDER BY ';
  let count = 0;
  const length = sort.length;

  sort.forEach((obj) => {
    const entries = Object.entries(obj);
    const [key, value] = entries[0];
    orderBy = `${orderBy}${key} ${value}`;
    if (count < length - 1) orderBy = `${orderBy}, `;
    count++;
  });

  return orderBy;
};

exports.useWhere = (query) => {
  let where = '';
  let values = [];

  if (!query || query.length === 0) return [where, values];

  let count = 0;
  const length = query.length;

  where = 'WHERE ';

  query.forEach((obj) => {
    where = `${where}?`;
    values = [...values, obj];
    if (count < length - 1) where = `${where} AND `;
    count++;
  });

  return [where, values];
};

exports.uuid = () => uuidv4();
