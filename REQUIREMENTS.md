# the requirements file for the project

## Database schema :
### the database contains 3 main entities and tables in addition to a many to many resultant table and they are as follows :-
1. products table that has the columns (id SERIAL PRIMARY KEY,title VARCHAR, price integer, descripe text, company VARCHAR ).

2. users table that has the columns (id SERIAL PRIMARY KEY,fname VARCHAR, lname VARCHAR, username VARCHAR, password VARCHAR ).

3. orders table that has the columns (id SERIAL PRIMARY KEY,user_id bigint REFERENCES users(id),
products_ids_qtys json [], status VARCHAR).

4. cart_items table that represnts a many to many relation ship between users and products they order with the columns (id SERIAL PRIMARY KEY,user_id bigint REFERENCES users(id) ,product_id bigint REFERENCES products(id) ,
quantity integer).

## used endpoints :
#### for products table :
1. index `GET /products`.
2. show `GET /products/:id`.
3. create `POST /products`.
4. delete `DELETE /products/:id`.
5. update `PUT /products/:id`.

#### for users table :
1. index `GET /users`.
2. show `GET /users/:id`.
3. create `POST /users`.
4. delete `DELETE /users/:id`.
5. update `PUT /users/:id`.
6. authenticate `POST /users/authenticate`.
7. to add to user's cart `POST /users/:id/cart`.
8. to get user's cart items `GET /users/:id/cart`.

#### for orders table :
1. index `GET /orders`.
2. show `GET /orders/:id`.
3. create `POST /orders`.
4. delete `DELETE /orders/:id`.

