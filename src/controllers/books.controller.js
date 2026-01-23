import * as BooksRepo from '../repositories/books.repository.js';

/**
 * Criar um novo livro
 */
export async function createBook(req, res) {
  try {
    // ⚠️ depois isso virá do auth (JWT)
    const userId = req.user?.id || '11111111-1111-1111-1111-111111111111';

    const { title, isbn, cover_price } = req.body;

    if (!title || !cover_price) {
      return res.status(400).json({
        error: 'Título e preço são obrigatórios',
      });
    }

    const book = await BooksRepo.createBook({
      userId,
      title,
      isbn,
      cover_price
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Erro ao cadastrar livro',
    });
  }
}