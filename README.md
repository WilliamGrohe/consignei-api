# Consignei API

API backend para controle de **consignações de livros**, criada inicialmente como um **sistema sob medida para autores independentes** e pensada desde o início para evoluir para um **SaaS**.

O projeto resolve um problema real e recorrente: o controle manual e descentralizado de livros consignados em livrarias, que gera atrasos em acertos, falta de visibilidade de estoque e prejuízo financeiro para o autor.

---

## 🚀 Objetivo do Projeto

Permitir que autores tenham:

* Visão clara de **quais livros estão consignados**
* Controle de **quantidades enviadas, vendidas e pendentes**
* Lembretes para **solicitar acertos periódicos**
* Base estruturada para automações futuras (contato, faturamento, NF-e)

---

## 🧩 Funcionalidades (MVP)

* Cadastro de autores (users)
* Cadastro de livros
* Cadastro de parceiros (livrarias)
* Registro de consignações
* Consulta de consignações por autor

### 🔜 Roadmap

* Alertas de consignações sem acerto
* Dashboard com indicadores
* Autenticação (JWT)
* Automação de contatos com parceiros
* Integração com emissão de NF-e (MEI)
* Evolução para modelo SaaS

---

## 🏗️ Arquitetura

O projeto segue uma separação clara de responsabilidades:

* **Routes** → Camada HTTP
* **Controllers** → Regras de negócio
* **Repositories** → Acesso ao banco (SQL isolado)
* **Database** → PostgreSQL com migrations e seeds

Estrutura base:

```
consignei-api/
├── src/
│   ├── server.js
│   ├── app.js
│   ├── db/
│   │   ├── index.js
│   │   └── pool.js
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
├── migrations/
├── seeds/
├── .env.example
├── .gitignore
```

---

## 🛠️ Tecnologias

* **Node.js**
* **Express**
* **PostgreSQL**
* **SQL (migrations manuais)**
* **JavaScript (ESM)**

---

## ⚙️ Como rodar o projeto localmente

### 1️⃣ Clonar o repositório

```
git clone https://github.com/seu-usuario/consignei-api.git
cd consignei-api
```

### 2️⃣ Instalar dependências

```
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` baseado no exemplo:

```
DATABASE_URL=postgres://user:password@localhost:5432/consignei
PORT=3000
```

### 4️⃣ Criar banco e rodar migrations

```bash
createdb consignei
psql -d consignei -f migrations/001_initial_schema.sql
psql -d consignei -f seeds/001_initial_seed.sql
```

### 5️⃣ Subir a API

```
node src/server.js
```

A API estará disponível em:

```
http://localhost:3000
```

---

## 📌 Exemplo de endpoint

```
GET /consignments
```

Retorna todas as consignações do autor autenticado.

---

## 🧠 Contexto do Projeto

Este projeto nasceu de um problema real identificado no mercado editorial independente, onde tanto autores quanto livrarias ainda dependem fortemente de controles manuais (planilhas, anotações, e-mails).

A proposta é oferecer uma solução simples, prática e escalável, começando com um sistema sob medida e evoluindo para um produto SaaS.

---

## 👤 Autor

Desenvolvido por **William Grohe**