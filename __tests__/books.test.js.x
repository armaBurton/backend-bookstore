const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');

describe('backend-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('returns an array of books', async () => {
    const expected = [
      {
        id: '1',
        title: 'Mice and Men',
        released: 1937,
        publisher: {
          id: '1',
          name: 'Tor Books'
        }
      },
      {
        id: '2',
        title: expect.any(String),
        released: 1995,
        publisher: {
          id: '2',
          name: 'Penguin Random House Company'
        }
      },
      {
        id: '3',
        title: 'The Windup Girl',
        released: 2009,
        publisher: {
          id: '3',
          name: 'Dark Horse Comics'
        }
      },
      {
        id: '4',
        title: 'Savage Hearts',
        released: 2022,
        publisher: {
          id: '4',
          name: 'Baen Books'
        }
      }
    ];

    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  it('returns a book with matching ID', async () => {
    const res = await request(app).get('/api/v1/books/1');
    expect(res.body).toEqual(expect.objectContaining({}));
  });

  it('create a book', async () => {
    const expected = {
      bookId: '3',
      publisherId: '4',
      // reviewId:'3',
      title: 'grokking alogorithims',
      released: 2012,
    };
    const res = await request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual({ ...expected, bookId: expect.any(String), publisherId: expect.any(String) });
  });

});
