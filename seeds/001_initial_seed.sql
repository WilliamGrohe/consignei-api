BEGIN;

-- USER (autor)
INSERT INTO users (id, name, email, password_hash)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Pedro Guerra',
  'contato@escritorpedroguerra.com',
  'hash_fake_por_enquanto'
);

-- PARTNER (livraria)
INSERT INTO partners (id, user_id, name, email)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'Livraria Central',
  'livraria@central.com'
);

-- BOOKS
INSERT INTO books (id, user_id, title, cover_price)
VALUES
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'Livro Exemplo 1',
  39.90
),
(
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  'Livro Exemplo 2',
  49.90
);

-- CONSIGNMENT
INSERT INTO consignments (
  id,
  user_id,
  partner_id,
  book_id,
  quantity_sent,
  sent_at,
  last_check,
  notes
)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  20,
  '2024-01-15',
  '2024-07-01',
  'Primeira consignação teste'
);

COMMIT;
