import pool from '../db/pool.js';

export async function createBook({ userId, title, isbn, cover_price }) {
  const sql = `
    INSERT INTO books (user_id, title, isbn, cover_price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const { rows } = await pool.query(sql, [
    userId,
    title,
    isbn,
    cover_price
  ]);

  return rows[0];
}
