const productsModel = require('../models/product_model');
const productsModelInstance = new productsModel();

const createError = require('http-errors');

module.exports = class productsService{
  async findAllProducts(){
    try{
      const allProducts = await productsModelInstance.findAllProducts();

      return allProducts;
    }catch(err){
      throw createError(500, err);
    }
  }

  //get one product by id
  async findProductById(id){
    try{
      const product = await productsModelInstance.findProductById(id);

      if(!product){
        throw createError(404, 'Product not found');
      }

      return product;
    } catch(err){
      throw /*createError(500, err)*/ err;
    }
  }
}