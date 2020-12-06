const express = require('express');
const { addBook } = require('./books-add-book');

const BooksRouter = express.Router();

BooksRouter.post('/', addBook);

exports.BooksRouter = BooksRouter;
