const express = require('express');
const { BooksRouter } = require('./books/books-router');

const ApiRouter = express.Router();

ApiRouter.use('/books', BooksRouter);

exports.ApiRouter = ApiRouter;
