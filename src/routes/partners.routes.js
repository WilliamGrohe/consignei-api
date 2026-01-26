import { Router } from 'express';
import { createPartner, getPartners } from '../controllers/partners.controller.js';

const router = Router();

router.get('/', getPartners);

router.post('/', createPartner);

export default router;
