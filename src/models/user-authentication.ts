import client from "../DB";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();
const pepper : string | unknown = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
export type user ={
    id?: string | number;
    fName: string;
    lName: string;
    userName:string;
    password : string;
}
export type cartItem = {
    id?: string | number,
    userId : string | number,
    productId : string | number,
    qty : number
}

export class UserStore{
    async index() : Promise<user[]> {
        try {
            const connection =await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`can not connect to DB ${err}`);
        }

    }
    async show(id : string | number):Promise<user> {
        try{
            const sql = `SELECT * FROM users WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not find user ${id}. error is ${err}`)
        }
    }

    async create(u : user) : Promise<user>{
        try{
            const sql = `INSERT INTO users (fname , lname ,username, password) VALUES($1, $2, $3, $4) RETURNING *`;
            const connection = await client.connect();
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt? salt : "10")
            )
            const result = await connection.query(sql,[u.fName,u.lName,u.userName,hash]);

            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not add user ${u.userName} , the error is ${err}`);
        }
    }
    async delete(id : string | number) : Promise<user>{
        try{
            const sql = `DELETE FROM users WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete user ${id} , the error is ${err}`);

        }
    }
    async update(id :string | number , u:user ) :Promise<user>{
        //fname VARCHAR, lname VARCHAR, username VARCHAR, password VARCHAR
        try{
            const sql = `UPDATE users SET fname=($1) , lname=($2) , username=($3), password=($4) WHERE id=($5) RETURNING *; `;
            const connection = await client.connect();
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt? salt : "10")
            );
            const result = await connection.query(sql,[u.fName , u.lName , u.userName , hash , id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not update user ${id} , the error is ${err}`);

        }
    }
    async authinticate(userName : string , password : string) : Promise <user | null>{
        try{
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const connection = await client.connect();
            console.log("connecting");
            const result = await connection.query(sql,[userName]);
            console.log(result.rows);
            connection.release();
            if(result.rows.length){
                const user = result.rows[0];
                console.log(user);
                if(bcrypt.compareSync(password + pepper , user.password)){
                    return user;
                }
                else{
                    throw new Error ("password is incorrect");
                }
            }
            else{
                return null;
            }
    }catch(err){
        throw new Error(`can not authenticate ${err}`);
        }
    }
    // for the cart items table (users is the prmary entity for it)
    async addCartItem(qty : number , userId : string | number , productId :string | number) : Promise<cartItem>{
        try{
            const sql = 'INSERT INTO cart_items(quantity, user_id , product_id) VALUES($1, $2, $3) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql,[qty,userId,productId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can't add cart items ,${err}`);

        }

    }
    async getCartItem(userId : string | number ) : Promise<cartItem[]>{
        try{
            const sql = 'SELECT * FROM cart_items WHERE user_id=($1);';
            const connection = await client.connect();
            const result = await connection.query(sql,[userId]);
            connection.release();
            return result.rows;

        }catch(err){
            throw new Error (`can not get cart items for user ${userId} , ${err}`);

        }
    }
     
}