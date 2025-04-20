const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  res.render('host/addProduct', {
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
    res.send(`
      <h1>Product Added ;Successfully</h1>
      <a href="/">Go to Home</a>
    `);
  }).catch(err => {
    res.send(`
      <h1>Error Adding Product</h1>
      <a href="host/add-product">Try Again</a>
   `);
  });
};

exports.getProductList = (req, res, next) => {

  Product.find().then(products => {
    res.render('host/productList', {
      products: products,
    });
  }).catch(err => {
    console.log(err);
  })
}
