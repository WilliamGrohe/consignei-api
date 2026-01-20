import {
  listConsignments,
  listOverdueConsignments,
  updateConsignmentLastCheck
} from '../controllers/consignments.controller.js';

export default async function consignmentsRoutes(app) {
  // ROTA PARA LISTAR CONSIGNAÇÕES
  app.get('/consignments', listConsignments);

  // ROTA PARA CONSIGNAÇÕES ATRASADAS
  app.get('/consignments/overdue', listOverdueConsignments);

  // ROTA PARA ATUALIZAR A DATA DE CONFERÊNCIA DA CONSIGNAÇÃO
  app.patch('/consignments/:id/last-check', updateConsignmentLastCheck);
}
