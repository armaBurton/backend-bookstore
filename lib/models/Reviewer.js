const pool = require('../utils/pool');

module.exports = class Reviewer {
  reviewer_id;
  name;
  company;

  constructor(row){
    this.reviewerId = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async getAllReviewers() {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM reviewers
      `
    );
    return rows.map(row => new Reviewer(row));
  }

  static async getReviewerById(id) {
    const { rows } = await pool.query(
      `SELECT
      *
      FROM
      reviewers
      WHERE
      reviewer_id=$1`,
      [id]
    );

    if(!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  static async insertReviewer({  name, company }) {
    const { rows } = await pool.query(
      `INSERT INTO
      reviewers (name, company)
      VALUES
      ($1, $2)
      RETURNING
      *`,
      [name, company]
    );
    return new Reviewer(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingReviewer = await Reviewer.getReviewerById(id);
    const updatedAttributes = { ...existingReviewer, ...attributes };
    const { name, company } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE
      reviewers
      SET
      name=$1,
      company=$2
      WHERE
      reviewer_id=$3
      RETURNING
      *`,
      [name, company, id]
    );
    return new Reviewer(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `SELECT
        review_id, 
        rating, 
        review_text, 
        books.book_id, 
        books.title
      FROM 
        books
      RIGHT JOIN
        reviews
      ON
        books.book_id = reviews.book_id
      WHERE
        review_id=$1
      `,
      [this.reviewer_id]
    );
    this.review = rows;
    return this;
  }

  static async deleteById(id) {

    const reviewer = await Reviewer.getReviewerById(id);
    const reviews = reviewer.getReviews();
    if(!reviews.length) {
      const { rows } = await pool.query(
        `DELETE FROM
            reviewers
            WHERE
            reviewer_id=$1
            RETURNING
            *`, 
        [id]
      );  
      if(!rows[0]) return null;
      return new Reviewer(rows[0]);
    }
  }
};

