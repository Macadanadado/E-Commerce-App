const express = require('express');
const app = express();
const productsRouter = require('./products')
const usersRouter = require('./users');
const ordersRouter = require('./orders');
const cartsRouter = require('./carts');
const authRouter = require('./register_user');

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
app.use('/register', authRouter);


module.exports = app;