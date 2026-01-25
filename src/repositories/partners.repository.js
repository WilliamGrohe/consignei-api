import pool from '../db/pool.js';

export async function getPartners() {
  const sql = `
    SELECT * FROM partners
  `;
  const { rows } = await pool.query(sql);
  return rows;
}

export async function createPartner(partner) {
  const sql = `
    INSERT INTO partners (
      user_id,
      name,
      contact_name,
      cnpj,
      notes
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const { rows } = await pool.query(sql, [
    partner.userId,
    partner.name,
    partner.contact_name,
    partner.cnpj,
    partner.notes
  ]);

  return rows[0];
}