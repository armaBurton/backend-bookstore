const pool = require('../utils/pool');

module.exports = class Reviewer {
  reviewer_id;
  name;
  company;

  constructor(row){
    this.reviewer_id = row.reviewer_id;
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
};
