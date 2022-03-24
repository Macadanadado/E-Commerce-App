const db = require('../db/db_index');

module.exports = class ordersModule{
  //create order
  async createOrder(data){
    try{
      const statement = `INSERT INTO orders (created, total, status, user_id)
                         VALUES ($1, $2, $3, $4)
                         RETURNING *`
      const values = data;

      const result = await db.query(statement, values);

      if(result.rows){
        return result.rows[0]
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //update order
  async updateOrder(status){
    try{
      const statement = `UPDATE orders
                         SET status = $1
                         RETURNING *`;
      const values = [status];

      const result = await db.query(statement, values);

      if(result.rows){
        return result.rows[0]
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find an order by id
  async findOrderById(id){
    try{
      const statement = `SELECT *
                         FROM orders
                         WHERE id = $1`;
      const value = [id];

      const result = await db.query(statement, value);

      if(result.rows){
        return result.rows[0]
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find an order by user_id
  async findOrderByUserId(user_id){
    try{
      const statement = `SELECT *
                         FROM orders
                         WHERE user_id = $1`;
      const value = [user_id];

      const result = await db.query(statement, value);

      if(result.rows){
        return result.rows[0]
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

}