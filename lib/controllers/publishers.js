const { Router } = require('express');
const Publisher = require('../models/Publisher');
const books = require('../models/Book');
const Book = require('../models/Book');

module.exports = Router()
  //GET /publishers
  .get('/', async (req, res) => {
    const publishers = await Publisher.getAllPublishers();
    res.json(publishers);
  })

  //GET /publishers/:id
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    function forBooks(){
      const bookArrObj = [];
      for (let b of getBooksByPublisherId){
        const bookObj = {
          bookId: b.bookId,
          title: b.title
        };
        bookArrObj.push(bookObj);
      }
      return bookArrObj;
    }
    //get books by publisher id
    const getBooksByPublisherId = await Book.getByPublisher(id);
    
    const publisher = await Publisher.getPublisherById(id);

    const publisherObj = {
      id: publisher.publisherId,
      name: publisher.name,
      city: publisher.city,
      state: publisher.state,
      country: publisher.country,
      books: forBooks()
    };

    console.log(`|| publisherObj >`, publisherObj);

    res.json(publisher);
  })

  //POST /publishers
  .post('/', async (req, res) => {
    const publisherPosted = await Publisher.insertPublisher(req.body);
    res.json(publisherPosted);
  });
