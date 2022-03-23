const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router().get('/', async (req, res) => {
  const review = await Review.getAllReviews();
  res.json(review);
});



