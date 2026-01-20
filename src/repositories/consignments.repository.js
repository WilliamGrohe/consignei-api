import { query } from '../db/index.js';

/**
 * Lista todas as consignações de um usuário
 */
export async function findAllByUser(userId) {
  const sql = `
    SELECT
      c.id,
      c.quantity_sent,
      c.sent_at,
      c.last_check,
      c.notes,
      c.active,

      b.title AS book_title,
      p.name  AS partner_name
    FROM consignments c
    JOIN books b     ON b.id = c.book_id
    JOIN partners p  ON p.id = c.partner_id
    WHERE c.user_id = $1
    ORDER BY c.sent_at DESC
  `;

  const { rows } = await query(sql, [userId]);
  return rows;
}
