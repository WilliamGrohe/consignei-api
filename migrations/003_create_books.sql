CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(150) NOT NULL,
  isbn VARCHAR(20),
  cover_price NUMERIC(10,2),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_book_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);