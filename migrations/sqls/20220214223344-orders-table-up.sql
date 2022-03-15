CREATE TABLE orders (id SERIAL PRIMARY KEY,
user_id bigint REFERENCES users(id),
products_ids_qtys json [] REFERENCES products(id),
status VARCHAR);