const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router()
//GET /publishers
  .get('/', async (req, res) => {
    const publishers = await Publisher.getAllPublishers();
    res.json(publishers);
  })
;
