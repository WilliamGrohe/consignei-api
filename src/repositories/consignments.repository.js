import { query } from "../db/index.js";
import pool from '../db/pool.js';

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
  `;

  const { rows } = await query(sql, [userId, days]);
  return rows;
}

/**
 * Atualiza a data de conferência da consignação
 */
export async function updateLastCheck({ consignmentId, userId, date, notes }) {
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

  const values = [date || new Date(), notes || null, consignmentId, userId];

  const { rows } = await query(sql, values);
  return rows[0];
}

// FUNÇÃO PARA OBTER O RESUMO DO DASHBOARD
export async function getDashboardConsignments(userId) {
  const sql = `
    SELECT
      c.id,
      p.name AS partner_name,
      c.sent_at,
      c.last_check,
      DATE_PART('day', NOW() - c.last_check) AS days_without_check,
      CASE
        WHEN c.last_check IS NULL THEN 'CRITICO'
        WHEN DATE_PART('day', NOW() - c.last_check) <= 90 THEN 'OK'
        WHEN DATE_PART('day', NOW() - c.last_check) <= 180 THEN 'ATENCAO'
        ELSE 'CRITICO'
      END AS status
    FROM consignments c
    JOIN partners p ON p.id = c.partner_id
    ORDER BY days_without_check DESC NULLS LAST
  `;

  const { rows } = await pool.query(sql);
  return rows;
}
