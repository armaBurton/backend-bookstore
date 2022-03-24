const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  // GET /api/v1/authors
  .get('/', async (req, res, next) => {
    const author = await Author.getAllAuthors();

    try {
      if (!author) {
        const error = new Error('no such author');
        error.status = 404;
        throw error;
      }

      res.json(author);
    } catch (error) {
      next(error);
    }
  })

  // GET /api/v1/authors/:id
  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.getAuthorById(req.params.id);
      res.json(author);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })

  // POST /api/v1/authors
  .post('/', async (req, res) => {
    const postedAuthor = await Author.insertAuthor(req.body);
    console.log(
      '🚀 ~ file: authors.js ~ line 36 ~ .post ~ postedAuthor',
      postedAuthor
    );

    res.json(postedAuthor);
  });
