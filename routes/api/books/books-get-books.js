const {
  dbErr,
  dbQuery,
  useOrderBy,
  useWhere,
} = require('../../../db/db-utils');
const { handle } = require('../../../utils/common');
const { check } = require('./books-validation');

const validation = [
  check.limit('query', false),
  check.offset('query', false),
  check.query('query', false),
  check.sort('query', false),
  check.res,
];

const getBooks = async (query, limit, offset, sort) => {
  const [where, values] = useWhere(query);
  const orderBy = useOrderBy(sort);

  const sql = `SELECT * FROM books ${where} ${orderBy} LIMIT ? OFFSET ?`;

  const [books, err] = await handle(dbQuery(sql, [...values, limit, offset]));
  if (err) throw dbErr;

  return books;
};

const handleGetBooks = async (req, res) => {
  try {
    const { limit, offset, sort, query } = req.query;
    const books = await getBooks(query, limit, offset, sort);
    res.json({ success: true, data: books });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.getBooks = [...validation, handleGetBooks];
