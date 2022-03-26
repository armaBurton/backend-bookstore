const { Router } = require('express');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Publisher = require('../models/Publisher');

module.exports = Router()
  // GET /api/v1/books
  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    const getPublisher = await Publisher.getAllPublishers();
    // console.log('|| books >', books);
    // console.log('|| getPublisher >', getPublisher);
    const bookArrObj = [];
    
    books.map(book => bookArrObj.push({
      id: book.bookId,
      title: book.title,
      released: book.released,
      publisher: forPublishers(book.bookId)
    }));

    function forPublishers(bookId){
      for(const g of getPublisher){
        if (Number(g.publisherId) === Number(bookId)){
          const publisherObj = {
            id: g.publisherId,
            name: g.name
          };
          return publisherObj;
        }
      }
    }
    
    res.json(bookArrObj);
  })

  // GET /api/v1/books/:id
  .get('/:id', async (req, res, next) => {
    const authorsArr = await Author.getAllAuthors();
    function forAuthors() {
      const arr = [];
      for (const author of authorsArr) {
        
        const newObj = {
          id: author.authorId,
          name: author.name
        };
        arr.push(newObj);
      
      }
      return arr;
    }
    try {
      const book = await Book.getBookByID(req.params.id);
      const publisherById = await Publisher
        .getPublisherById(req.params.id);
      
      const authorObj = forAuthors();
      
      const newObj = { 
        title: req.body.book_id ?? book.title,
        released: req.body.released ?? book.released,
        publisher: { 
          id: book.publisherId,
          name: publisherById.name
        },
        authors: authorObj
      };

      res.json(newObj);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  })

  // POST /api/v1/books
  .post('/', async (req, res) => {
    const postedBook = await Book.insertBook(req.body);
    res.json(postedBook);
  });
