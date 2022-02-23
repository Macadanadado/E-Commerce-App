const db = require('../db/db_index');

module.exports = class UserModel {
  //create a new user
  async createUser(data) {
    try{
      const statement = `INSERT INTO users (id, password, email, first_name, last_name, created)
                         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = data

      const result = await db.query(statement, values);

      if(result.rows.length){
        return result.rows[0]
      }
    } catch(err){
      throw new Error(err);
    }
    
  }

  //update an existing user
  async updateUser(data){
    try{
      const statement = `UPDATE users
                         SET id = $1, password = $2, email = $3, first_name = $4, last_name = $5, created = $6
                         WHERE id = $1
                         RETURNING *`;
      const values = data;

      const result = await db.query(statement, values);

      if(result.rows){
        return result.rows[0];
      }

      return null;
    } catch(err){
      throw new Error(err);
    }
  }

  //find user by email
  async findUserByEmail(email){
    try{
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`
      const values = [email];

      const result = await db.query(statement, values)

      if(result.rows){
        return result.rows[0];
      }

      return null;
      
    } catch(err){
      throw new Error(err);
    }
  }

  //fing user by id
  async findUserById(id){
    try{
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`
      const values = [id];

      const result = await db.query(statement, values)

      if(result.rows){
        return result.rows[0];
      }
    } catch(err){
      throw new Error(err);
    }
  }

}