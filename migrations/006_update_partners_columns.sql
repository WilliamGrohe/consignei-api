-- 1️⃣ Adicionar novas colunas
ALTER TABLE partners
ADD COLUMN contact_name VARCHAR(150),
ADD COLUMN notes TEXT,
ADD COLUMN cnpj VARCHAR(14);

-- 2️⃣ Preencher CNPJ nos registros existentes
UPDATE partners
SET cnpj = '01234567000199'
WHERE cnpj IS NULL;

-- 3️⃣ Garantir que o CNPJ tenha apenas números e 14 dígitos
ALTER TABLE partners
ADD CONSTRAINT cnpj_only_numbers
CHECK (cnpj ~ '^[0-9]{11,14}$');

-- 4️⃣ Tornar o CNPJ obrigatório
ALTER TABLE partners
ALTER COLUMN cnpj SET NOT NULL;