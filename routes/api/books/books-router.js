const express = require('express');
const { addBook } = require('./books-add-book');
const { getBooks } = require('./books-get-books');
const { getBook } = require('./books-get-book');
const { updateBook } = require('./books-update-book');

const BooksRouter = express.Router();

BooksRouter.post('/', addBook);
BooksRouter.get('/', getBooks);
BooksRouter.get('/:id', getBook);
BooksRouter.put('/:id', updateBook);

exports.BooksRouter = BooksRouter;
