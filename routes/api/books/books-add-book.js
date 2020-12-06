const { dbErr, dbQuery, uuid } = require('../../../db/db-utils');
const { handle } = require('../../../utils/common');
const { check } = require('./books-validation');

const validation = [
  check.author('body', true),
  check.contentType('header', true),
  check.title('body', true),
  check.description('body', true),
  check.res,
];

const addBook = async (author, title, description) => {
  const sql = 'INSERT INTO books SET ?';
  const newBook = { id: uuid(), author, title, description };

  const [data, err] = await handle(dbQuery(sql, [newBook]));
  if (err) throw dbErr;

  if (data.affectedRows === 0) throw dbErr;

  return newBook;
};

const handleAddBook = async (req, res) => {
  try {
    const { author, title, description } = req.body;
    const newBook = await addBook(author, title, description);
    res.json({ success: true, data: newBook });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.addBook = [...validation, handleAddBook];
