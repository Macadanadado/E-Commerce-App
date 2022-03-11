const users_model = require('../models/users_model');
const usersModelInstance = new users_model();

const createError = require('http-errors');

module.exports = class usersService{
  //get a user by id
  async getUserById(id){
    try{
      const user = await usersModelInstance.findUserById(id)
      
      return user;
    } catch(err){
      throw createError(404, 'User not found');
    }
  }

  //update a user by id
  async updateUserById(userId, data){
    try{
      const user = await usersModelInstance.findUserById(userId);
      const { id } = data

      if(!user || userId != id){
        throw createError(404, 'User not found');
      }
      
      const objToArr = Object.values(data)
      const updatedData = [ ...objToArr ]

      const updatedUser = await usersModelInstance.updateUser(updatedData);
      return updatedUser;
    } catch(err){
      throw err
    }
  }
}