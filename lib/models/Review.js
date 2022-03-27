const pool = require('../utils/pool');

module.exports = class Review {
  reviewId;
  reviewerId;
  reviewText;
  rating;
  bookId;

  constructor(row) {
    this.reviewId = row.review_id;
    this.reviewerId = row.reviewer_id;
    this.reviewText = row.review_text;
    this.rating = row.rating;
    this.bookId = row.book_id;
  }

  static async getAllReviews() {
    const { rows } = await pool.query(
      `
        SELECT
          review_id,
          reviewer_id,
          review_text,
          rating,
          book_id
        FROM reviews
        GROUP BY rating, review_id
        LIMIT 100
      `
    );
    return rows.map((row) => new Review(row));
  }

  static async insertReview({ rating, reviewText, bookId, reviewerId }) {
    const { rows } = await pool.query(
      `INSERT INTO 
      reviews (rating, review_text, book_id, reviewer_id)
      VALUES
      ($1, $2, $3, $4)
      RETURNING
      *`,
      [rating, reviewText, bookId, reviewerId]
    );
    return new Review(rows[0]);
  }

  static async getReviewByBookId(id){
    const { rows } = await pool.query(
      `
        SELECT
          review_id,
          rating,
          review_text,
          reviewer_id,
          book_id
        FROM
          reviews
        WHERE
          book_id=$1
      `,
      [id]
    );
    return rows.map(row => new Review(row));
  }

  
  static async getReviewerReviews(id){
    const { rows } = await pool.query(
      `
        SELECT *
        FROM reviews
        WHERE reviewer_id=$1
      `,
      [id]
    );

    return rows.map(row => new Review(row));
  }
  
};

