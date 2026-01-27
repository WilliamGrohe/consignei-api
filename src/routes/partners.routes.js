import { Router } from 'express';
import { createPartner, getPartner, getPartners } from '../controllers/partners.controller.js';

const router = Router();

router.get('/', getPartners);

router.get('/:cnpj', getPartner);

router.post('/', createPartner);

export default router;
