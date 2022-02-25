const userModel = require('../models/users_model');
const userModelInstance = new userModel();
const createError = require('http-errors');

module.exports = class authService{
  //register a new user
  async registerUser(data){
    try{
      const { email } = data;

      const user = await userModelInstance.findUserByEmail(email);

      if(user){
        throw createError(409, 'Email already in use')
      }
      const newUser = await userModelInstance.createUser(data);
      return newUser;
    } catch(err){
      throw createError(500, err);
    }  
  }

  //login user if given proper credentials
  async loginUser(data){
    try{
      const { email, password } = data;
      
      const user = await userModelInstance.findUserByEmail(email);

      if(!user){
        throw createError(401, 'Incorrect username or password');
      }

      if(user.password !== password){
        throw createError(401, 'Incorrect username or password');
      }

      return user;
    } catch(err){
      throw createError(500, err)
    }
  }
}