const db = require('../db/db_index');

module.exports = class ordersProductsModel{
  //create item
  async create(data){
    try{
      const statement = `INSERT INTO orders_products
                         VALUES (id = $1, quantity = $2, created = $3, price = $4, order_id = $5, product_id = $6)
                         RETURNING *`;
      const values = [data];

      const result = await db.query(statement, values);

      if(result.rows){
        return result.rows
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find orders products
  async find(id){
    try{
      //select product info for products in orders
      const statement = `SELECT 
                         op.quantity,
                         op.id AS orders_products_id,
                         products.*
                         FROM orders_products AS op
                         JOIN products ON op.product_id = products.id
                         WHERE op.order_id = $1`;
      const value = [id];

      const result = await db.query(statement, value);

      if(result.rows){
        return result.rows
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }
}