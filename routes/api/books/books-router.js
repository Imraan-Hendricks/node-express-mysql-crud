const express = require('express');
const { addBook } = require('./books-add-book');
const { getBooks } = require('./books-get-books');

const BooksRouter = express.Router();

BooksRouter.post('/', addBook);
BooksRouter.get('/', getBooks);

exports.BooksRouter = BooksRouter;
