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
      cnpj,
      contact_name,
      phone,
      email,
      notes
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const { rows } = await pool.query(sql, [
    partner.userId,
    partner.name,
    partner.cnpj,
    partner.contact_name,
    partner.phone,
    partner.email,
    partner.notes,
  ]);

  return rows[0];
}