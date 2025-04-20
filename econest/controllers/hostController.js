const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  res.render('host/addProduct', {
    isLoggedIn: req.isLoggedIn,
    pageTitle: 'Add Product',
    cssPage: '/css/addProductStyle.css',
    // isLoggedIn: req.isLoggedIn,
  });
};

// const Products = [];

exports.postAddProduct = (req, res, next) => {
  const { name, price, carbonFootprint, category, description, image } = req.body;

  const product = new Product({
    name: name,
    price: price,
    carbonFootprint: carbonFootprint,
    category: category,
    description: description,
    imageURL: image,
  });

  product.save().then(() => {
    res.render('host/Added', {
      isLoggedIn: req.isLoggedIn,
    });
  }).catch(err => {
    console.log('err adding product', err);
  });
};

exports.getProductList = (req, res, next) => {

  Product.find().then(products => {
    res.render('host/productList', {
      products: products,
      isLoggedIn: req.isLoggedIn,
    });
  }).catch(err => {
    console.log(err);
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByIdAndDelete(productId).then(() => {
    res.redirect('/host/product-lists');
  });
}
