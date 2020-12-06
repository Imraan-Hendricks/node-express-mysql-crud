const { dbErr, dbQuery } = require('../../../db/db-utils');
const { handle } = require('../../../utils/common');
const { check } = require('./books-validation');

const validation = [check.id('param', true), check.res];

const findBook = async (id) => {
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

const deleteBook = async (id) => {
  const sql = 'DELETE FROM books WHERE ?';

  const [data, err] = await handle(dbQuery(sql, [{ id }]));
  if (err) throw dbErr;

  if (data.affectedRows === 0)
    throw [
      {
        location: 'params',
        param: 'id',
        msg: 'no book found',
        value: id,
      },
    ];
};

const handleDeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await findBook(id);
    await deleteBook(id);
    res.json({ success: true, data: book });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.deleteBook = [...validation, handleDeleteBook];
