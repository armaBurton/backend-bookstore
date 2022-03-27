const { Router } = require('express');
const Review = require('../models/Review');
const Book = require('../models/Book');

module.exports = Router()

// GET /api/v1/reviews
  .get('/', async (req, res) => {
    const review = await Review.getAllReviews();
    const reviewArr = [];
    for(let i = 0; i < review.length; i++){
      const book = await Book.getBookByID(review[i].bookId);
      reviewArr.push({
        id: review[i].reviewId,
        rating: review[i].rating,
        review: review[i].reviewText,
        book: {
          id: review[i].bookId,
          title: book.title
        }
      });
    }
    res.json(reviewArr);
  })

//POST /api/v1/reviews
  .post('/', async (req, res) => {
    const review = await Review.insertReview(req.body);
    res.send(review);
  });

