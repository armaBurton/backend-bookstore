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

  it('returns an array of books', async () => {
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns an array of authors', async () => {
    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns an array of reviewers', async () => {
    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns an array of top 100 reviews', async () => {
    const res = await request(app).get('/api/v1/reviews');
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

});
