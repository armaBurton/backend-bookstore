const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('returns an array of publishers', async () => {
    // const expected = await Publisher.getAllPublishers();
    const res = await request(app).get('/api/v1/publishers');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns a publisher with matching ID', async () => {
    const expected = {
      id: '2',
      name: 'Penguin Random House Company',
      city: 'New York City',
      state: 'New York',
      country: 'USA',
      books: [
        {
          bookId: '2',
          title: expect.any(String)
        },
        {
          bookId: '3',
          title: 'The Windup Girl'
        }
      ]
    };
    
    const res = await request(app).get('/api/v1/publishers/2');
    expect(res.body).toEqual(expected);
  });

  it('creates a publisher', async () => {
    const expected = {
      publisherId: '3',
      name: 'john',
      city: 'kansas city',
      state: 'MO',
      country: 'Peru',
    };
    const res = await request(app).post('/api/v1/publishers').send(expected);
    expect(res.body).toEqual({ ...expected, publisherId: expect.any(String) });
  });

});
