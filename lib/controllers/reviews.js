const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()

// GET /api/v1/reviews
  .get('/', async (req, res) => {
    const review = await Review.getAllReviews();
    res.json(review);
  })

//POST /api/v1/reviews
  .post('/', async (req, res) => {
    const review = await Review.insertReview(req.body);
    res.send(review);
  });

