const express = require('express');
const registerUserRouter = express.Router();
const authService = require('../services/auth_service');
const authServiceInstance = new authService();

registerUserRouter.post('/register', (req, res, next)=>{
  const { email } = req.body;
  const newUser = authServiceInstance.registerUser(email);
  res.send(newUser);
})

module.exports= registerUserRouter;