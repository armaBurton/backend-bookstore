const { Router } = require('express');
const res = require('express/lib/response');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
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
    
  });
