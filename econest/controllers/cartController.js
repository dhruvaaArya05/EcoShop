const Product = require('../model/product');
const Cart = require('../model/cart');

//get cart controller
exports.getCart = (req, res, next) => {
  // Cart.find().then((id) => {
  //   id.map(cartId => {
  //     Product.findById(cartId).then(product => {
  //       console.log(product);
  //     })
  //   })
  // }).catch(err => {
  //   console.log('err', err);
  // });
  //
  Cart.find().then(cartIds => {
    cartIds = cartIds.map((cartId) => cartId.id.toString());
    console.log(cartIds);
    Product.find().then(products => {
      const cartProducts = products.filter(product => cartIds.includes(product.id.toString()));

      //calculate total carbon footprint
      const totalCarbon = cartProducts.reduce((sum, product) => {
        const value = parseFloat(product.carbonFootprint); // "1.5kg CO2" -> 1.5
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      console.log(`Total Carbon Footprint: ${totalCarbon}kg CO2`);

      const totalPrice = cartProducts.reduce((sum, product) => {
        const value = parseFloat(product.price);
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      console.log('Total price', totalPrice);

      //render ejs
      res.render('cart', {
        products: cartProducts,
        cssPage: '/css/cartstyle3.css',
        pageTitle: 'Cart',
        totalCarbon: totalCarbon,
        totalPrice: totalPrice,
        // isLoggedIn: req.isLoggedIn,
      });
    }).catch(err => {
      console.log('errror', err);
    });
  }).catch(err => {
    console.log('error', err);
  });
};

//post Add To Cart Controller
exports.postAddToCart = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);

  const cart = new Cart({
    id: productId,
  });
  cart.save().then(() => {
    console.log('cart item id saved in db', productId);
    res.send(`<h1>Item added to cart</h1>
      <a href="/products">Go to Products</a>`);
  }).catch(err => {
    console.log('err', err);
  });
}

//Post Remove From Cart
exports.postRemoveCartItem = (req, res, next) => {
  const productId = req.params.productId;
  console.log('item deleting', productId);

  Cart.findOneAndDelete({ id: productId }).then(() => {
    console.log('Deleted cart item', productId);
    res.redirect('/cart');
  }).catch(err => {
    console.log('err while deleting', err);
  });
};