const pool = require('../utils/pool');

module.exports = class Author {
  author_id;
  name;
  date_of_birth;
  place_of_birth;

  constructor (row) {
    this.authorId = row.author_id;
    this.name = row.name;
    this.dateOfBirth = row.date_of_birth;
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
};
