const express = require('express');
const productsRouter = express.Router();

const productsService = require('../services/products_service');
const productsServiceInstance = new productsService();

//get all products
productsRouter.get('/', async (req, res, next)=>{
  try{
    const products = await productsServiceInstance.findAllProducts();

    res.send(products);
  } catch(err){
    next(err);
  }
})

//get on product by id
productsRouter.get('/:productId', async (req, res, next)=>{
  try{
    const { productId } = req.params;

    const product = await productsServiceInstance.findProductById(productId);

    res.send(product);
  } catch(err){
    next(err);
  }
})


module.exports = productsRouter;