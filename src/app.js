// configura middlewares e rotas
import express from 'express';
import cors from 'cors';

import consignmentsRoutes from './routes/consignments.routes.js';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

consignmentsRoutes(app);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Futuramente:
// app.use('/books', booksRoutes);
// app.use('/consignments', consignmentsRoutes);

export default app;
