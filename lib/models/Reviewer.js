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

  static async getReviewById() {
    const { rows } = await pool.query(
      `SELECT
      *
      FROM
      reviews
      WHERE
      review_id=$1`,
      [id]
    );

    if(!rows[0]) return null;
    return new Review(rows[0]);
  }
};

