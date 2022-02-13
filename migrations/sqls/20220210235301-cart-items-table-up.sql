CREATE TABLE cart_items (id SERIAL PRIMARY KEY,
user_id bigint REFERENCES users(id) ,
 product_id bigint REFERENCES products(id) ,
  quantity integer);