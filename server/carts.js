const express = require('express');
const cartsRouter = express.Router();

const cartService = require('../services/cart_service');
const cartServiceInstance = new cartService();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//cart routes
//create a new cart
cartsRouter.post('/', jsonParser, async (req, res, next)=>{
  try{
    const data = req.body;
    const newCart = await cartServiceInstance.createCart(data);

    res.send(newCart);
  }catch(err){
    next(err);
  }
})

//get a cart by userid
cartsRouter.get('/mycart/:userId', async (req, res, next)=>{
  try{
    const userId = req.params.userId;
    const cart = await cartServiceInstance.findCartByUserId(userId);

    res.send(cart);
  }catch(err){
    next(err);
  }
})

//add item to cart
cartsRouter.post('/mycart/:userId/items', jsonParser, async (req, res, next)=>{
  try{
    const data = req.body; //productId and quantity
    const userId = req.params.userId;
    const addedItem = await cartServiceInstance.addItem(userId, data);

    res.send(addedItem);
  }catch(err){
    next(err);
  }
})

//update item in cart
cartsRouter.put('/mycart/:userId/:itemId', jsonParser, async (req, res, next)=>{
  try{
    const userId = req.params.userId;
    const data = req.body;

    const updatedItem = await cartServiceInstance.updateItem(userId, data)

    res.send(updatedItem);
  }catch(err){
    next(err);
  }
})

//delete item from cart
cartsRouter.delete('/mycart/items/:cartitemId', async (req, res, next)=>{
  try{
    const cartItemId = req.params.cartitemId;

    const response = await cartServiceInstance.deleteItem(cartItemId);

    res.send(response);
  }catch(err){
    next(err);
  }
})

//checkout
cartsRouter.post('/mycart/:userId/checkout', async (req, res, next)=>{
  try{
    const userId = req.params.userId
    
    const response = await cartServiceInstance.checkout(userId);

    res.send(response);
  }catch(err){
    next(err)
  }
})

module.exports = cartsRouter;