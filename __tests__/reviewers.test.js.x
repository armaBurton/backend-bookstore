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

  it('creates a reviewer', async() => {
    const expected = {
      name: 'Jack Beanstalk',
      company: 'Green Island Inc'
    };

    const res = await request(app)
      .post('/api/v1/reviewers')
      .send(expected);

    expect(res.body).toEqual({ ...expected, reviewerId: expect.any(String) });
  });

  it('updates a reviewer by Id', async() => {
    const expected = {
      reviewerId: expect.any(String),
      name: 'Patrick Podlesnik',
      company: 'Ratty Comic Books'
    };

    const res = await request(app)
      .put('/api/v1/reviewers/1')
      .send({
        name: 'Patrick Podlesnik',
      });

    expect(res.body).toEqual(expected);
  });

  it('deletes a review if there are no reviews', async() => {
    const reviewer = await Reviewer.insertReviewer({
      name: 'Jacky Twins',
      company: 'Penguins Publishing Company'
    });

    const expected = {
      reviewerId: expect.any(String),
      name: 'Jacky Twins',
      company: 'Penguins Publishing Company'
    };
    // const expected = await Reviewer.getReviewerById(reviewer.reviewerId);
    
    const res = await request(app)
      .delete(`/api/v1/reviewers/${reviewer.reviewerId}`);

    expect(res.body).toEqual(expected);
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
