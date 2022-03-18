const createError = require('http-errors');
const ordersModel = require('../models/orders_model');
const ordersModelInstance = new ordersModel();

const createError = require('http-errors');
const moment = require('moment');

module.exports = class orderService{
  //might not need
  async addItems(){
    try{

    }catch(err){
      throw createError(500, err);
    }
  }
}