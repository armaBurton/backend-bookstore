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
      const authorArr = [];
      author.map(aut => authorArr.push({ 
        id: aut.authorId,
        name: aut.name
      })
      );

      res.json(authorArr);
    } catch (error) {
      next(error);
    }
  })

  // GET /api/v1/authors/:id
  .get('/:id', async (req, res, next) => {
    const { id } = req.params;

    const author = await Author.getAuthorById(id);
    const booksByAuthor = await Author.getBooksByAuthor(id);

    function forBooks(){
      const booksArr = [];
      booksByAuthor.map(bba => booksArr.push({
        id: bba.authorId,
        title: bba.title,
        released: bba.released
      }));

      return booksArr;
    }

    try {
      const authorObj = {
        name: author.name,
        dob: author.dateOfBirth,
        pob: author.placeOfBirth,
        books: forBooks()
      };

      res.json(authorObj);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })

  // POST /api/v1/authors
  .post('/', async (req, res) => {
    const postedAuthor = await Author.insertAuthor(req.body);

    res.json(postedAuthor);
  });
