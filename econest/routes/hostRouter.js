const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controllers/hostController');

hostRouter.get('/host/add-product', hostController.getAddProduct);
hostRouter.post('/host/add-product', hostController.postAddProduct);

hostRouter.get('/host/product-lists', hostController.getProductList);

hostRouter.post('/host/delete-product/:productId', hostController.postDeleteProduct);

module.exports = hostRouter;