const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res, next) => {
    const author = await Author.getAllAuthors();

    try{
      if (!author){
        const error = new Error('no such author');
        error.status = 404;
        throw error;
      }
    
      res.json(author);
    } catch (error) {
      next(error);
    }
    
  });
