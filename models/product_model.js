const db = require('../db/db_index');

module.exports = class productsModel {
  //find all products
  async findAllProducts(){
    try{
      const statement = `SELECT * 
                        FROM products`;
      const values = [];

      const result = await db.query(statement, values);

      if(result.rows){
        return result.rows
      }
      
      return null;
    } catch(err){
      throw new Error(err)
    }
  }

  //find a product by id
  async findProductById(id) {
    try{
      const statement = `SELECT *
                         FROM products
                         WHERE id = $1`;
      const values = [id];

      const result = db.query(statement, values);

      if(result.rows){
        return result.rows[0];
      }

      return null;
    } catch(err){
      throw new Error(err)
    }
  }
}