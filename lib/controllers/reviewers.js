const { Router } = require('express');
const res = require('express/lib/response');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  // GET /api/v1/reviewers
  .get('/', async (req, res, next) => {
    const reviewer = await Reviewer.getAllReviewers();

    try{
      if (!reviewer){
        const error = new Error('No Such Reviewer');
        error.status = 404;
        throw error;
      }
    
      res.json(reviewer);
    } catch (error) {
      next(error);
    }
  })

  // GET /api/v1/reviewers/:id
  .get('/:id', async(req, res, next) => {
    try {
      const reviewer = await Review.getReviewById(req.params.id);
      res.json(reviewer);
    } catch(error) {
      error.status = 400;
      next(error);
    }
  });
