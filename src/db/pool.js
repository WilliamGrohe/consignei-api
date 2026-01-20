import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});

pool.on('connect', () => {
  console.log('📦 Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro inesperado no PostgreSQL', err);
  process.exit(1);
});

export default pool;
