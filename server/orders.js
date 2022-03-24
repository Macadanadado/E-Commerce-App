const express = require('express');
const ordersRouter = express.Router();

const orderService = require('../services/orders_service');
const orderServiceInstance = new orderService();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//get order
ordersRouter.get('/myorder/:userId', async (req, res, next)=>{
  try{
    const userId = req.params.userId;

    const response = await orderServiceInstance.getOrder(userId)

    res.send(response);
  }catch(err){
    next(err);
  }
})

//get order by id

//update order
ordersRouter.put('/myorder', jsonParser, async (req, res, next)=>{
  try{
    const { status } = req.body

    const response = await orderServiceInstance.updateOrder(status);

    res.send(response);
  }catch(err){
    next(err);
  }
})

module.exports = ordersRouter;