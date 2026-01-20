CREATE TABLE settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_id UUID NOT NULL,
  sold_quantity INTEGER NOT NULL,
  settled_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT now(),

  CONSTRAINT fk_settlement_consignment
    FOREIGN KEY (consignment_id)
    REFERENCES consignments(id)
    ON DELETE CASCADE
);
