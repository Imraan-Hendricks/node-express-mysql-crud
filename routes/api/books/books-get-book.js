const { dbErr, dbQuery } = require('../../../db/db-utils');
const { handle } = require('../../../utils/common');
const { check } = require('./books-validation');

const validation = [check.id('param', true), check.res];

const getBook = async (id) => {
  const sql = 'SELECT * FROM books WHERE ?';

  const [books, err] = await handle(dbQuery(sql, [{ id }]));
  if (err) throw dbErr;

  const book = books[0];
  if (!book)
    throw [
      {
        location: 'params',
        param: 'id',
        msg: 'no book found',
        value: id,
      },
    ];

  return book;
};

const handleGetBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBook(id);
    res.json({ success: true, data: book });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.getBook = [...validation, handleGetBook];
