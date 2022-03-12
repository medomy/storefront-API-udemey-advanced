import client from "../DB";

export class Dashboard{
    async usersCarts(): Promise<{username : string , productname : string , qty : number}[]>{
        try {
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT username, product_id, quantity FROM users INNER JOIN cart_items ON users.id = cart_items.user_id'
      
            const result = await conn.query(sql)
      
            conn.release()
            return result.rows
          } catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
          } 
    }

}