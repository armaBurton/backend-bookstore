const { Router } = require('express');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Publisher = require('../models/Publisher');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  // GET /api/v1/books
  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    const getPublisher = await Publisher.getAllPublishers();
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
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.getBookByID(id);
    const publisher = await Publisher.getPublisherById(book.publisherId);
    const reviews = await Review.getReviewByBookId(id);
    const author = await Book.getAuthorsByBookId(id);

    const authorArr = [];
    for(let i = 0; i < author.length; i++){
      const authorName = await Author.getAuthorById(author[i].authorId);
      authorArr.push({
        id: authorName.authorId,
        name: authorName.name
      });
    }

    const reviewArr = [];
    for(let i = 0; i < reviews.length; i++){
      const reviewer = await Reviewer.getReviewerById(reviews[i].reviewerId);
      reviewArr.push({
        id: reviews[i].reviewId,
        rating: reviews[i].rating,
        review: reviews[i].reviewText,
        reviewer: {
          id: reviewer.reviewerId,
          name: reviewer.name
        }
      });
    }

    const bookObj = {
      title: book.title,
      released: book.released,
      publisher: {
        id: book.publisherId,
        name: publisher.name
      },
      authors: authorArr,
      reviews: reviewArr
    };
    res.json(bookObj);
  })

  // POST /api/v1/books
  .post('/', async (req, res) => {
    const postedBook = await Book.insertBook(req.body);
    res.json(postedBook);
  });
