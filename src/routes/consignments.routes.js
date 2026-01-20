import { Router } from 'express';
import {
  listConsignments,
  listOverdueConsignments,
  updateConsignmentLastCheck,
  getConsignmentsDashboard 
} from '../controllers/consignments.controller.js';

const router = Router();

// ROTA PARA O DASHBOARD DE CONSIGNAÇÕES
router.get('/dashboard', getConsignmentsDashboard);

// ROTA PARA LISTAR CONSIGNAÇÕES
router.get('/', listConsignments);

// ROTA PARA CONSIGNAÇÕES ATRASADAS
router.get('/overdue', listOverdueConsignments);

// ROTA PARA ATUALIZAR A DATA DE CONFERÊNCIA DA CONSIGNAÇÃO
router.patch('/:id/last-check', updateConsignmentLastCheck);

export default router;