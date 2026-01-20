import {
  listConsignments,
  listOverdueConsignments
} from '../controllers/consignments.controller.js';

export default async function consignmentsRoutes(app) {
  // ROTA PARA LISTAR CONSIGNAÇÕES
  app.get('/consignments', listConsignments);

  // ROTA PARA CONSIGNAÇÕES ATRASADAS
  app.get('/consignments/overdue', listOverdueConsignments);
}
