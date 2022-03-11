const express = require('express');
const usersRouter = express.Router();

const authService = require('../services/auth_service');
const authServiceInstance = new authService();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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