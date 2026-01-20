CREATE TABLE consignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  partner_id UUID NOT NULL,
  book_id UUID NOT NULL,

  quantity_sent INTEGER NOT NULL,
  sent_at DATE NOT NULL,

  last_check DATE,
  notes TEXT,
  active BOOLEAN DEFAULT true,

  created_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_cons_user
    FOREIGN KEY (user_id)
    REFERENCES users(id),

  CONSTRAINT fk_cons_partner
    FOREIGN KEY (partner_id)
    REFERENCES partners(id),

  CONSTRAINT fk_cons_book
    FOREIGN KEY (book_id)
    REFERENCES books(id)
);
