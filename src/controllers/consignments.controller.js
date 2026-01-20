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
// passo 2 - Depois isso vira JWT