const db = require('../db/db_index');

module.exports = class cartsModel {
  //create cart
  async createCart(data){
    try{
      const statement = `INSERT INTO carts
                         VALUES ($1, $2, $3)
                         RETURNING *`;
      const values = data;

      const result = db.query(statement, values);

      if(result.rows){
        return result.rows[0];
      }

      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find cart by id
  async findCartById(id) {
    try{
      const statement = `SELECT *
                         FROM carts
                         WHERE id = $1`;
      const value = [id];

      const result = db.query(statement, value);

      if(result.rows){
        return result.rows[0]
      }

      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find cart by user_id
  async findCartByUserId(user_id){
    try{
      const statement = `SELECT *
                         FROM carts
                         WHERE user_id = $1`;
      const value = [user_id];

      const result = db.query(statement, value);

      if(result.rows){
        return result.rows[0]
      }
      
      return null
    } catch(err){
      throw new Error(err);
    }
  }

}