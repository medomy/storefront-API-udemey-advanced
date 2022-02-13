import dotenv from 'dotenv';
import {Pool} from 'pg';
dotenv.config();

const {
    POSTGRES_HOST,
POSTGRES_DB ,
POSTGRES_TEST_DB,
POSTGRES_USER ,
POSTGRES_PASSWORd,
ENV,
BCRYPT_PASSWORD ,
SALT_ROUNDS,
TOKEN_SECRET
} = process.env;
let client:any ;
if(ENV === "dev"){
    client = new Pool ({
        host : POSTGRES_HOST,
        database : POSTGRES_DB,
        user :POSTGRES_USER,
        password: POSTGRES_PASSWORd
    });
}
else if(ENV === "test"){
     client = new Pool ({
        host : POSTGRES_HOST,
        database : POSTGRES_TEST_DB,
        user :POSTGRES_USER,
        password: POSTGRES_PASSWORd
    });
}


export default client;
