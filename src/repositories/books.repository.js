import { pool } from '../db/pool.js';

export async function createBook({ userId, title, isbn, price, author }) {
  const sql = `
    INSERT INTO books (user_id, title, isbn, price, author)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const { rows } = await pool.query(sql, [
    userId,
    title,
    isbn,
    price,
    author,
  ]);

  return rows[0];
}
