import client from "../DB";

export type product = {
    id?: number,
    title: string,
    price: number,
    descripe: string,
    company: string
}

export class ProductStore {
    async getAllProduct(): Promise<product[]> {
        try {
            const connection =await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`can not connect to DB ${err}`);
        }
    }
    async getOneProduct(id : string | number): Promise<product>{
        try{
            const sql = `SELECT * FROM products WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not find product ${id}. error is ${err}`)
        }
    }
    async createProdct(p:product) : Promise<product>{
        try{
            const sql = `INSERT INTO products (title , price ,descripe, company) VALUES($1, $2, $3, $4) RETURNING *`;
            const connection = await client.connect();
            const result = await connection.query(sql,[p.title,p.price,p.descripe,p.company]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not add product ${p.title} , the error is ${err}`);
        }
    }
    async deleteProduct(id : string | number) : Promise<product>{
        try{
            const sql = `DELETE FROM products WHERE id=($1)`;
            const connection = await client.connect();
            const result = await connection.query(sql,[id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete product ${id} , the error is ${err}`);

        }
    }
    async updateProduct(id : string | number , p:product) : Promise<product>{
        try{
            const sql = 'UPDATE products SET title=($1) , price=($2) , descripe=($3) , company=($4) WHERE id=($5) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql,[p.title , p.price , p.descripe , p.company , id]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`could not update , ${err}`);
        }
    }
}
