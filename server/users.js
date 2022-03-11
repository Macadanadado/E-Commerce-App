const express = require('express');
const usersRouter = express.Router();

const authService = require('../services/auth_service');
const authServiceInstance = new authService();

const usersService = require('../services/users_service');
const usersServiceInstance = new usersService();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


//get a user by id
usersRouter.get('/:userId', async (req,res, next)=>{
  try{
    const userId = req.params.userId;
    const user = await usersServiceInstance.getUserById(userId);

    res.send(user);
  } catch(err){
    next(err);
  }
})

//update a user
usersRouter.put('/:userId', jsonParser, async (req, res, next)=>{
  try{
    const userId = req.params.userId;
    const data = req.body;
    const updatedUser = await usersServiceInstance.updateUserById(userId, data);

    res.send(updatedUser)

  }catch(err){
    next(err);
  }
})

//register a new user
usersRouter.post('/register', jsonParser, async (req, res, next)=>{
  try{
    const data = req.body;
    const newUser = await authServiceInstance.registerUser(data);

    res.status(201).send(newUser);
  } catch(err){
    next(err)
  }
})

//login a user
usersRouter.post('/login', jsonParser, async (req, res, next)=>{
  try{
    const data = req.body;
    const user = await authServiceInstance.loginUser(data);

    res.send(user);
  } catch(err){
    next(err);
  }
})

module.exports = usersRouter;