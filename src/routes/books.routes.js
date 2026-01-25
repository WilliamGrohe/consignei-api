import { Router } from 'express';
import { createBook, getBooks } from '../controllers/books.controller.js';

const router = Router();

// CADASTRO DE LIVRO
router.post('/', createBook);

router.get('/', getBooks);

export default router;
