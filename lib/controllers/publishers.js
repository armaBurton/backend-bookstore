const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router()
//GET /publishers
  .get('/', async (req, res) => {
    const publishers = await Publisher.getAllPublishers();
    res.json(publishers);
  })


  //GET /publishers/:id
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    const publisher = await Publisher.getPublisherById(id);


    res.json(publisher);
  })

;
