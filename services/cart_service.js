const cartModel = require('../models/carts_model');
const cartModelInstance = new cartModel();
const cartsProductsModel = require('../models/carts_products_model');
const cartsProductsModelInstance = new cartsProductsModel();
const ordersModel = require('../models/orders_model');
const ordersModelInstance = new ordersModel();
const ordersProductsModel = require('../models/orders_products_model');
const ordersProductsModelInstance = new ordersProductsModel();

const createError = require('http-errors');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = class cartService{
  //create a new cart
  async createCart(data){
    try{
      const dataAsObj = Object.values(data);
      const cartData = [...dataAsObj];
      const newCart = await cartModelInstance.createCart(cartData);
      return newCart;
    }catch(err){
      throw createError(500, err);
    }
  }

  //find a cart by user id
  async findCartByUserId(userId){
    try{
      const cart = await cartModelInstance.findCartByUserId(userId);
      const items = await cartsProductsModelInstance.findProductsInCart(cart.id);
      cart.items = items;
      
      return cart;
    }catch(err){
      throw createError(500, err);
    }
  }

  //add item to cart
  async addItem(userId, data){
    try{
      const cart = await cartModelInstance.findCartByUserId(userId);

      const created = moment.utc().toISOString();
      const cartProductData = [data.id, created, data.productId, cart.id, data.quantity];

      const cartProduct = await cartsProductsModelInstance.createCartProduct(cartProductData)
      
      return cartProduct;
    }catch(err){
      throw createError(500, err)
    }
  }

  //update item in cart
  async updateItem(userId, data){
    try{
      const cart = await cartModelInstance.findCartByUserId(userId);

      const cartProductData = [data.id, data.created, data.productId, cart.id, data.quantity];

      const updatedItem = await cartsProductsModelInstance.updateCartProduct(cartProductData);

      return updatedItem;
    }catch(err){
      throw createError(500, err);
    }
  }

  //delete item from cart
  async deleteItem(cartItemId){
    try{
      /*
      const cart = await cartModelInstance.findCartByUserId(userId);

      const items = await cartsProductsModelInstance.findProductsInCart(cart.id);
      cart.items = items
      const itemToDelete = await cart.items.filter(item => item.id === itemId);
      const data = [itemToDelete.id, cart.id];

      const response = await cartsProductsModelInstance.deleteCartProduct(data);
      */
      const data = [cartItemId]
      const response = await cartsProductsModelInstance.deleteCartProduct(data);
      return response
    }catch(err){
      throw createError(500, err);
    }
  }

  //checkout
  async checkout(userId){
    try{
      const cart = await cartModelInstance.findCartByUserId(userId);
      const items = await cartsProductsModelInstance.findProductsInCart(cart.id);
      const total = items.reduce((total, item) => {
        const price = item.price.substring(1)
        return total += Number(price);
       }, 0);

      const created = moment.utc().toISOString();
      
      const data = [created, total, 'Pending', userId]
      const createdOrder = await ordersModelInstance.createOrder(data);
      
      items.forEach(item => ordersProductsModelInstance.create([item.quantity, created, item.price, createdOrder.id, item.id]))
    }catch(err){
      throw createError(500, err);
    }
  }
}