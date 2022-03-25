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
};

