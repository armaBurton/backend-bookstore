const pool = require('../utils/pool');

module.exports = class Author {
  authorId;
  name;
  dateOfBirth;
  placeOfBirth;

  constructor (row) {
    this.authorId = row.author_id;
    this.name = row.name;
    this.dateOfBirth = new Date(row.date_of_birth).toLocaleDateString().replace(/\/+/g, '-');
    // this.dateOfBirth = new Date(row.date_of_birth).getTime();
    this.placeOfBirth = row.place_of_birth;
  }

  static async getAllAuthors(){
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          authors
      `
    );
    return rows.map(row => new Author(row));
  }
  
  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT
        *
      FROM
        authors
      WHERE
        author_id=$1`,
      [id]
    );

    if(!rows[0]) return null;
    return new Author(rows[0]);
  }

  static async getBooksByAuthor(id){
    const { rows } = await pool.query(
      `
        SELECT
          authors.author_id,
          books.book_id,
          books.title,
          books.released
        FROM
          authors
        LEFT JOIN author_book ON author_book.author_id = authors.author_id
        LEFT JOIN books ON author_book.book_id = books.book_id
        WHERE
          authors.author_id = $1
      `,
      [id]
    );
    return rows;
  }

  static async getAuthorsByBookId(id){
    const { rows } = await pool.query(
      `
        SELECT authors.author_id, authors.name
        FROM books
        LEFT JOIN author_book ON author_book.book_id = book.book_id
        LEFT JOIN authors ON author_book.author_id = authors.author_id
        WHERE book.book_id=$1
      `,
      [id]
    );
    return rows.map(row => new Author(row));
  }

  static async insertAuthor({ name, dateOfBirth, placeOfBirth }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
      authors (name, date_of_birth, place_of_birth)
      VALUES ($1, $2, $3)
      RETURNING
      *
      `, [name, dateOfBirth, placeOfBirth]
    );
    return new Author(rows[0]);
  }
};
