
# Banco de dados
PostgreSQL (ideal)

TABELAS CRIADAS:

users
→ o autor (cliente do sistema)

partners
→ livrarias / consignados

books
→ livros do autor

consignments
→ envio de livros para parceiros

settlements
→ acertos (histórico)

-------

# Autenticação
Login simples (e-mail + senha)
Nada de OAuth no MVP

# Infra
Deploy simples:
 Railway, Render ou Fly.io

# Frontend
✔ React
 Frameworks:
  Vite + React
  UI: MUI, Ant Design ou ShadCN

# Backend
Node.js 
Express ou Fastify

# ESTRUTURA
src/
├── server.js → só sobe o servidor
├── app.js → configura middlewares e rotas
├── db/ → cuida exclusivamente do banco
│   ├── pool.js
│   └── index.js
