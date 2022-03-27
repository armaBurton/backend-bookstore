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

  it('returns an array of top 100 reviews', async () => {
    const res = await request(app).get('/api/v1/reviews');
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('creates a review', async () => {
    const expected = {
      reviewerId: '1',
      reviewText: 'This book is amazing!',
      bookId: '1',
      rating: 4
    };

    const res = await request(app)
      .post('/api/v1/reviews')
      .send(expected);
    
    expect(res.body).toEqual({ ...expected, reviewerId: expect.any(String), bookId: expect.any(String), reviewId: expect.any(String) });
  });
});
