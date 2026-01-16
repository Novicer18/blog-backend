const db = require("../config/db");

class ArticleModel {
  static async findAll(filters) {
    let query = "SELECT * FROM articles WHERE 1=1";
    const params = [];

    if (filters.published_date) {
      query += " AND published_date = ?";
      params.push(filters.published_date);
    }

    if (filters.tags) {
      query += " AND tags LIKE ?";
      params.push(`%${filters.tags}%`);
    }

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { title, content, tags, published_date } = data;

    const [result] = await db.execute(
      `INSERT INTO articles (title, content, tags, published_date)
       VALUES (?, ?, ?, ?)`,
      [title, content, tags, published_date]
    );

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const { title, content, tags, published_date } = data;

    await db.execute(
      `UPDATE articles
       SET title=?, content=?, tags=?, published_date=?
       WHERE id=?`,
      [title, content, tags, published_date, id]
    );

    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await db.execute(
      "DELETE FROM articles WHERE id=?",
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = ArticleModel;
