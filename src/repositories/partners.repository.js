import pool from '../db/pool.js';

export async function getPartners() {
  const sql = `
    SELECT * FROM partners
  `;
  const { rows } = await pool.query(sql);
  return rows;
}