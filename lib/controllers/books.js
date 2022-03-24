const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()

  // GET /api/v1/books
  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    res.json(books);
  })
  // GET /api/v1/books/:id
  .get('/:id', async(req, res, next) => {
    try {
      const book = await Book.getBookByID(req.params.id);
      res.json(book);
    } catch(error) {
      error.status = 400;
      next(error);
    }
  })

