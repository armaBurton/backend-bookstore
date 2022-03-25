const pool = require('../utils/pool');

module.exports = class Book {
  book_id;
  publisher_id;
  title;
  released;

  constructor(row) {
    this.bookId = row.book_id;
    this.publisherId = row.publisher_id;
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

  static async getBookByID(id) {
    const { rows } = await pool.query(
      `
      SELECT
        books.title,
        books.released,
        publishers.name,
        publishers.publisher_id,
        authors.author_id,
        authors.name,
        reviews.review_id,
        reviews.rating,
        reviews.review_text,
        reviewers.reviewer_id,
        reviewers.name
      FROM
        books
        LEFT JOIN publishers
        ON books.publisher_id = publishers.publisher_id
        LEFT JOIN author_book
        ON books.book_id = author_book.book_id
        LEFT JOIN authors
        ON author_book.author_id = authors.author_id
        LEFT JOIN reviews
        ON books.book_id = reviews.book_id
        LEFT JOIN reviewers
        ON reviewers.reviewer_id = reviews.reviewer_id
      WHERE
        books.book_id=$1
      `,
      [id]
    );
    return new Book(rows[0]);
  }

  static async insertBook({ title, released, publisherId }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
      books (title, released, publisher_id)
      VALUES
        ($1, $2, $3)
      RETURNING
      *
      `,
      [title, released, publisherId]
    );
    return new Book(rows[0]);
  }
};
