const { Router } = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  // GET /api/v1/reviewers
  .get('/', async (req, res, next) => {
    const reviewer = await Reviewer.getAllReviewers();
    const reviewerArr = [];
    reviewer.map(rev => reviewerArr.push({
      id: rev.reviewerId,
      name: rev.name,
      company: rev.company
    }));

    try{
      if (!reviewer){
        const error = new Error('No Such Reviewer');
        error.status = 404;
        throw error;
      }
    
      res.json(reviewerArr);
    } catch (error) {
      next(error);
    }
  })

  // GET /api/v1/reviewers/:id
  .get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
      const reviewer = await Reviewer.getReviewerById(id);
      const reviewerReviews = await Review.getReviewerReviews(reviewer.reviewerId);
      const bookIdArr = [];
      reviewerReviews.map(rr => bookIdArr.push(rr.bookId));

      const reviewArr = [];
      for(let i = 0; i < reviewerReviews.length; i++){
        const getBook = await Book.getBookByID(reviewerReviews[i].bookId);
        const bookObj = {
          id: reviewerReviews[i].bookId,
          title: getBook.title
        };

        reviewArr.push({
          id: reviewerReviews[i].reviewId,
          rating: reviewerReviews[i].rating,
          review: reviewerReviews[i].reviewText,
          book: bookObj
        });
      }

      const reviewerObj = {
        id: reviewer.reviewerId,
        name: reviewer.name,
        company: reviewer.company,
        reviews: reviewArr
      };

      res.json(reviewerObj);
    } catch(error) {
      error.status = 400;
      next(error);
    }
  
  })

// POST /api/v1/reviewers
  .post('/', async(req, res) => {
    const reviewer = await Reviewer.insertReviewer(req.body);
    res.send(reviewer);
  })

  // PUT /api/v1/reviewers
  .put('/:id', async(req, res) => {
    const reviewer = await Reviewer.updateById(req.params.id, req.body);
    res.send(reviewer);
  })

  // DELETE /api/v1/reviewers
  .delete('/:id', async (req, res) => {
    const reviewer = await Reviewer.deleteById(req.params.id);
    res.send(reviewer);
  });
