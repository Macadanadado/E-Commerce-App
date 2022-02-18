const express = require('express');
const apiRouter = express.Router();
const productsRouter = require('./products')
const usersRouter = require('./users');
const ordersRouter = require('./orders');
const cartsRouter = require('./carts');

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/carts', cartsRouter)



module.exports = apiRouter;