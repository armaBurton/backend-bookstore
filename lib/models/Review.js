const pool = require('../utils/pool');

module.exports = class Review {
  review_id;
  reviewer_id;
  review_text;
  rating;
  book_id;

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

        SELECT MAX(rating) AS rating
        FROM reviews
        GROUP BY rating		
        LIMIT 100

      `
    );
    return rows.map((row) => new Review(row));
  }

};

// lines to be added in our SQL statement, also to show Dan
// MAX(rating)
// GROUP BY reviewer_id
// LIMIT 100
