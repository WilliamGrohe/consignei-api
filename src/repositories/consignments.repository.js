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
      p.name  AS partner_name,

      (
        CURRENT_DATE -
        COALESCE(c.last_check, c.sent_at)
      ) AS days_without_check

    FROM consignments c
    JOIN books b     ON b.id = c.book_id
    JOIN partners p  ON p.id = c.partner_id
    WHERE c.user_id = $1
    ORDER BY days_without_check DESC
  `;

  const { rows } = await query(sql, [userId]);
  return rows;
}

// LISTA AS CONSIGNAÇÕES ATRASADAS POR USUARIO
export async function findOverdueByUser(userId, days = 180) {
  const sql = `
    SELECT
      c.id,
      c.last_check,
      c.sent_at,
      c.quantity_sent,
      b.title AS book_title,
      p.name AS partner_name,
      (CURRENT_DATE - c.last_check) AS days_without_check
      FROM consignments c
    JOIN books b ON b.id = c.book_id
    JOIN partners p ON p.id = c.partner_id
    WHERE c.user_id = $1
      AND c.active = true
      AND c.last_check IS NOT NULL
      AND (CURRENT_DATE - c.last_check) >= $2
    ORDER BY days_without_check DESC
  `

  const { rows } = await query(sql, [userId, days]);
  return rows;
}

/**
 * Atualiza a data de conferência da consignação
 */
export async function updateLastCheck({
  consignmentId,
  userId,
  date,
  notes,
}) {
  const sql = `
    UPDATE consignments
    SET
      last_check = $1,
      notes = COALESCE($2, notes)
    WHERE id = $3
      AND user_id = $4
      AND active = true
    RETURNING *
  `;

  const values = [
    date || new Date(),
    notes || null,
    consignmentId,
    userId,
  ];

  const { rows } = await query(sql, values);
  return rows[0];
}

// FUNÇÃO PARA OBTER O RESUMO DO DASHBOARD
export async function getDashboardSummary(userId) {
  const sql = `
    SELECT
      COUNT(*) AS total,

      COUNT(*) FILTER (
        WHERE (CURRENT_DATE - COALESCE(last_check, sent_at)) <= 90
      ) AS ok,

      COUNT(*) FILTER (
        WHERE (CURRENT_DATE - COALESCE(last_check, sent_at)) BETWEEN 91 AND 180
      ) AS warning,

      COUNT(*) FILTER (
        WHERE (CURRENT_DATE - COALESCE(last_check, sent_at)) > 180
      ) AS critical

    FROM consignments
    WHERE user_id = $1
      AND active = true
  `;

  const { rows } = await query(sql, [userId]);
  return rows[0];
}
