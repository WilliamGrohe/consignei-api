import { listConsignments } from '../controllers/consignments.controller.js';

export default async function consignmentsRoutes(app) {
  app.get('/consignments', listConsignments);
}
