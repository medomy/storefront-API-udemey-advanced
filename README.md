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
3. create your own local DataBase using postgresSql and provide its data in the database.json file and the .env file.

4. run `db-migrate up` to apply all the database tables to your copy
5. to connect to the app you should first open the server by using the command `npm run start` and use the URL stated in the console to connect to the app
### please note :
1. the port on which this api is run is 3000 and it was tested in the local machine only.
2. the database Port is 5432.

## accomplished tasks :-
-complete CRUD operation for products and users tables
-complete endpoints for both of them
-Adding table cart that is a many to many relationship of products and users
-using jwt for authenticating

## Important scripts :- 
-`npm run start` (to begin the server);
-`npm run test` (to apply our tests); 


## Note that :- 
-the project is not a final draft for sure and I am willing to do it all over agai if that's what it takes.