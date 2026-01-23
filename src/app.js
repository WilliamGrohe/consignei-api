// configura middlewares e rotas
import express from 'express';
import cors from 'cors';

import consignmentsRoutes from './routes/consignments.routes.js';
import booksRoutes from './routes/books.routes.js';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());


// consignmentsRoutes(app);
app.use('/consignments', consignmentsRoutes);

app.use('/books', booksRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


export default app;
