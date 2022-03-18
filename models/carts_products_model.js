const db = require('../db/db_index');

module.exports = class cartsProductsModel{
  //create cart product
  async createCartProduct(data){
    try{
      const statement = `INSERT INTO carts_products
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING *`;
      const values = data;

      const results = await db.query(statement, values);

      if(results.rows){
        return results.rows
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find cart product
  async findProductsInCart(cart_id){
    try{
      //select product information for products in cart
      const statement = `SELECT 
                          carts_products.quantity,
                          carts_products.id AS "cart_product_id",
                          products.*
                         FROM carts_products
                         JOIN products ON carts_products.product_id = products.id
                         WHERE carts_products.cart_id = $1`;
      const value = [cart_id];

      const result = await db.query(statement, value);

      if(result.rows){
        return result.rows
      }
      return null;
    } catch(err){
      throw new Error(err)
    }
  }

  //update cart product
  async updateCartProduct(data){
    try{
      const statement = `UPDATE carts_products
                         SET id = $1, created = $2, product_id = $3, cart_id = $4, quantity = $5
                         WHERE id = $1
                         RETURNING *`;
      const values = data;

      const result = await db.query(statement, values)

      if(result.rows[0]){
        return result.rows
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //delete cart product
  async deleteCartProduct(data){
    try{
      const statement = `DELETE 
                         FROM carts_products
                         WHERE id = $1
                         RETURNING *`;
      const value = data;

      const result = await db.query(statement, value);

      if(result.rows){
        return result.rows;
      }
      return null;
    } catch(err){
      throw new Error(err);
    }
  }
}