const { Router } = require('express');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Publisher = require('../models/Publisher');
const Review = require('../models/Review');
const { getAllReviewers } = require('../models/Reviewer');
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
  .get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const authorsArr = await Author.getAllAuthors();
    const book = await Book.getBookByID(id);
    const publisherById = await Publisher.getPublisherById(id);
    const reviewsByBookId = await Review.getReviewByBookId(id);
    console.log('|| reviewsByBookId >', reviewsByBookId);

    function forAuthors() {
      const arr = [];
      for (const author of authorsArr) {
        if(author.authorId === id){
          const newObj = {
            id: author.authorId,
            name: author.name
          };
          arr.push(newObj);
        }
      
      }
      return arr;
    }

    const getReviewerByReview = await Reviewer.getReviewerByReviewId(id);
    const reviewerPerson = { id: getReviewerByReview.reviewerId, name: getReviewerByReview.name };

    console.log(`|| getReviewerByReview >`, getReviewerByReview[0]);
    console.log(`|| reviewerPerson >`, reviewerPerson);


    async function forReviews(review){
      const arr = [];
      for (const r of review){
        const reviewObj = {
          id: r.reviewId,
          rating: r.rating,
          review: r.reviewText,
          reviewer: { ...reviewerPerson }
        };
        console.log('|| reviewObj >', reviewObj);
        arr.push(reviewObj);
      }
      return arr;
    };

    try {
      
      const newObj = { 
        title: req.body.book_id ?? book.title,
        released: req.body.released ?? book.released,
        publisher: { 
          id: book.publisherId,
          name: publisherById.name
        },
        authors: forAuthors(),
        reviews: await forReviews(reviewsByBookId)
      };

      console.log('|| newObj >', newObj);
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
