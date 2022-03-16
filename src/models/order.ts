
import client from "../DB";

export type orderedProducts ={
    productId : number | string,
    qty : number
}

export type order = {
    id?: number,
    userId : number | string,
    products : Array <orderedProducts>,
    status : string,

}

export class OrderStore {
    async index(): Promise<order[]> {
        try {
            const connection =await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`can not connect to DB ${err}`);
        }
    }
    async show(id : string | number): Promise<order>{
        try{
            const sql = `SELECT * FROM orders WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not find order ${id}. error is ${err}`)
        }
    }
    async create(o:order) : Promise<order>{
        try{
            const sql = `INSERT INTO orders (user_id , products_ids_qtys ,status) VALUES($1, $2, $3) RETURNING *`;
            const connection = await client.connect();
            const result = await connection.query(sql,[o.userId,/*JSON.stringify*/(o.products),o.status]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not add order ${o.id} , the error is ${err}`);
        }
    }
    async delete(id : string | number) : Promise<order>{
        try{
            const sql = `DELETE FROM orders WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete order ${id} , the error is ${err}`);

        }
    }
}
