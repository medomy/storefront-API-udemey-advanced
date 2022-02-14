# Store-front api project 


## setup and connecting to database :-
1. install all packages using `npm i` script in the terminal
2. create a .env file containing all the environment variables needed for this project such as (
    POSTGRES_HOST 
POSTGRES_DB,
POSTGRES_TEST_DB,
POSTGRES_USER,
POSTGRES_PASSWORd,
ENV,
BCRYPT_PASSWORD,
SALT_ROUNDS,
TOKEN_SECRET
)

3. create a database.json file containing your development database information in addition to your test database information

4. run `db-migrate up` to apply all the database tables to your copy

### please note :
1. the port on which this api is run is 3000 and it was tested in the local machine only

## accomplished tasks :-
-complete CRUD operation for products and users tables
-complete endpoints for both of them
-Adding table cart that is a many to many relationship of products and users
-using jwt for authenticating

## Important scripts :- 
-npm run start (to begin the server);


## Note that :- 
-the project is not a final draft for sure and I am willing to do it all over agai if that's what it takes.