import * as ConsignmentsRepo from '../repositories/consignments.repository.js';

export async function listConsignments(req, res) {
  try {
    // temporário: user fixo (Pedro)
    const userId = '11111111-1111-1111-1111-111111111111';

    const consignments = await ConsignmentsRepo.findAllByUser(userId);

    res.json(consignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar consignações' });
  }
}
// controlamos as consignações (listagem, criação, atualização, etc)

// Controller do alerta de consignações atrasadas
export async function listOverdueConsignments(req, res) {
  try {
    const userId = '11111111-1111-1111-1111-111111111111';

    const days = Number(req.query.days) || 180;

    const overdue =
      await ConsignmentsRepo.findOverdueByUser(userId, days);

    res.json({
      days_threshold: days,
      total: overdue.length,
      data: overdue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar consignações atrasadas' });
  }
}

// passo 2 - Depois isso vira JWT