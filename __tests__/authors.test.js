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

  it('returns an array of authors', async () => {
    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({})])
    );
  });

  it('create an author', async () => {
    const expected = {
      name: 'bob',
      dateOfBirth: '4-24-1970',
      placeOfBirth: 'Rio'
    };
    const res = await request(app).post('/api/v1/authors').send(expected);
    expect(res.body).toEqual({ ...expected, authorId: expect.any(String) });
  });

  it('returns a author with matching ID', async () => {
    const res = await request(app).get('/api/v1/authors/2');
    expect(res.body).toEqual(expect.objectContaining({}));
  });
});
