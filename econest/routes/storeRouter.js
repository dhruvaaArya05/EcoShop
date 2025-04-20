const path = require('path');

const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controllers/storeController');
const cartController = require('../controllers/cartController');

storeRouter.get('/', storeController.getHome);
storeRouter.get('/categories', storeController.getCategories);
//categories router
storeRouter.get('/fashionable', storeController.getFashionableProducts);
storeRouter.get('/home-living', storeController.getHomeLivingProducts);

storeRouter.get('/kitchen-dining', storeController.getKitchenProducts);

storeRouter.get('/eco-friendly-toys', storeController.getToys);

storeRouter.get('/stationery-items', storeController.getStationeryItems);

storeRouter.get('/personal-care', storeController.getPersonalCareProducts);

storeRouter.get('/products', storeController.getProducts);
//product details router
storeRouter.get('/product/:productId', storeController.getProductDetails);

storeRouter.get('/cart', cartController.getCart);
storeRouter.post('/add-to-cart/:productId', cartController.postAddToCart);
storeRouter.post('/remove-item/:productId', cartController.postRemoveCartItem);

module.exports = storeRouter;