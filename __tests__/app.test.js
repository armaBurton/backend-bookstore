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
    const res = await request(app).get('/api/v1/publishers/1');
    expect(res.body).toEqual(expect.objectContaining({}));
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

  it('returns an array of books', async () => {
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns a book with matching ID', async () => {
    const res = await request(app).get('/api/v1/books/1');
    expect(res.body).toEqual(expect.objectContaining({}));
  });

  it('create a book', async () => {
    const expected = {
      bookId: '3',
      publisherId: '4',
      reviewId:'3',
      title: 'grokking alogorithims',
      released: 2012,
    };
    const res = await request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual({ ...expected, bookId: expect.any(String), publisherId: expect.any(String), reviewId: expect.any(String) });
  });

  it('returns an array of authors', async () => {
    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns a author with matching ID', async () => {
    const res = await request(app).get('/api/v1/authors/1');
    expect(res.body).toEqual(expect.objectContaining({}));
  });

  it('returns an array of reviewers', async () => {
    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('returns a reviewer with matching ID', async () => {
    const res = await request(app).get('/api/v1/reviewers/1');
    expect(res.body).toEqual(expect.objectContaining({}));
  });

  it('returns an array of top 100 reviews', async () => {
    const res = await request(app).get('/api/v1/reviews');
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });
});
