const { dbErr, dbQuery } = require('../../../db/db-utils');
const { handle } = require('../../../utils/common');
const { check } = require('./books-validation');

const validation = [
  check.id('param', true),
  check.author('body', false),
  check.contentType('header', true),
  check.title('body', false),
  check.description('body', false),
  check.res,
];

const updateBook = async (id, author, title, description) => {
  const update = {};
  if (author) update.author = author;
  if (title) update.title = title;
  if (description) update.description = description;

  const sql = 'UPDATE books SET ? WHERE ?';

  const [data, err] = await handle(dbQuery(sql, [update, { id }]));
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

const handleUpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, description } = req.body;
    await updateBook(id, author, title, description);
    const book = await getBook(id);
    res.json({ success: true, data: book });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.updateBook = [...validation, handleUpdateBook];
