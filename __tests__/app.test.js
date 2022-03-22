const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Publisher = require('../lib/models/Publisher');

describe('backend-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('returns an array of publishers', async() => {
    // const expected = await Publisher.getAllPublishers();
    const res = await request(app)
      .get('/api/v1/publishers');

    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({})
    ]));
  });
});
