CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(120),
  phone VARCHAR(30),
  created_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_partner_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
