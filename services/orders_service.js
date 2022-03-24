const ordersModel = require('../models/orders_model');
const ordersModelInstance = new ordersModel();
const ordersProductsModel = require('../models/orders_products_model');
const ordersProductsModelInstance = new ordersProductsModel();

const createError = require('http-errors');
const moment = require('moment');

module.exports = class orderService{
  //get order by userId
  async getOrder(userId){
    try{
      const order = ordersModelInstance.findOrderByUserId(userId);
      const items = ordersProductsModelInstance.find(order.id);
      order.items = items;

      return order;
    }catch(err){
      throw createError(500, err);
    }
  }

  //update order status
  async updateOrder(status){
    try{
      const updatedOrder = await ordersModelInstance.updateOrder(status);

      return updatedOrder;
    }catch(err){
      throw createError(500, err);
    }
  }
}