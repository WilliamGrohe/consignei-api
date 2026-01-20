import * as ConsignmentsRepo from '../repositories/consignments.repository.js';
import { getConsignmentStatus } from '../../utils/consignmentStatus.js';

export async function listConsignments(req, res) {
  try {
    // temporário: user fixo (Pedro)
    const userId = '11111111-1111-1111-1111-111111111111';

    const consignments = await ConsignmentsRepo.findAllByUser(userId);

    const enriched = consignments.map(c => ({
      ...c,
      status: getConsignmentStatus(c.days_without_check),
    }));

    res.json(enriched);
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

// CONTROLLER PARA ATUALIZAR A DATA DE CONFERÊNCIA DA CONSIGNAÇÃO
export async function updateConsignmentLastCheck(req, res) {
  try {
    const userId = '11111111-1111-1111-1111-111111111111';

    const { id } = req.params;
    const { date, notes } = req.body;

    const updated =
      await ConsignmentsRepo.updateLastCheck({
        consignmentId: id,
        userId,
        date,
        notes,
      });

    if (!updated) {
      return res.status(404).json({
        error: 'Consignação não encontrada ou inativa',
      });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erro ao atualizar conferência',
    });
  }
}

// CONTROLLER PARA OBTER O RESUMO DO DASHBOARD
export async function getConsignmentsDashboard(req, res) {
  try {
    const userId = '11111111-1111-1111-1111-111111111111';

    const summary =
      await ConsignmentsRepo.getDashboardSummary(userId);

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar dashboard' });
  }
}


// passo 2 - Depois isso vira JWT