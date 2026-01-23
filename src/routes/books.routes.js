import { Router } from 'express';
import { createBook } from '../controllers/books.controller.js';

const router = Router();

// CADASTRO DE LIVRO
router.post('/', createBook);

export default router;
