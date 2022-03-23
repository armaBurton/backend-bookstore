const pool = require('../utils/pool');

module.exports = class Book {
  book_id;
  publisher_id;
  review_id;
  title;
  released;

  constructor(row) {
    this.bookId = row.book_id;
    this.publisherId = row.publisher_id;
    this.reviewId = row.review_id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAllBooks() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            books
            `
    );
    return rows.map((row) => new Book(row));
  }

};
