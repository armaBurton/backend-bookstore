const { Router } = require('express');
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
      const reviewer = await Reviewer.getReviewerById(req.params.id);
      res.json(reviewer);
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
