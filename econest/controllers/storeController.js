//get Home Controller
// const { Products } = require('../controllers/hostController');
const Product = require('../model/product');
const Cart = require('../model/cart');

exports.getHome = (req, res, next) => {
  res.render('home', {
    isLoggedIn: req.isLoggedIn,
    pageTitle: 'Home',
    cssPage: '/css/homeStyle.css',
    // isLoggedIn: req.isLoggedIn,
  });
};

//get categories Controller
exports.getCategories = (req, res, next) => {
  res.render('categories', {
    pageTitle: 'Categories',
    // isLoggedIn: req.isLoggedIn,
  });
};

//particular products finding Controller
exports.getFashionableProducts = (req, res, next) => {
  Product.find({ category: 'Recycled Fashion' }).then(products => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      products: products,
      pageTitle: 'Fashionable Items',
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'Recycle Fashionable',
      titleDescription: 'recycle fashionable',
    });
  }).catch(err => {
  });
}

exports.getHomeLivingProducts = (req, res, next) => {
  Product.find({ category: 'Home and Living' }).then(products => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      products: products,
      pageTitle: 'Home & Living Items',
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'Home & Living',
      titleDescription: 'home and living',
    });
  }).catch(err => {
  });
}

exports.getKitchenProducts = (req, res, next) => {
  Product.find({ category: 'Kitchen Essentials' }).then(products => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      products: products,
      pageTitle: 'Kitchen & Dining Items',
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'Kitchen & Dining',
      titleDescription: 'kitchen and dining',
    });
  }).catch(err => {
  });
}

exports.getToys = (req, res, next) => {
  Product.find({ category: 'Toys' }).then(products => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      products: products,
      pageTitle: 'Eco-Friendly Toys',
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'Eco-Friendly Toys',
      titleDescription: 'eco-friendly toys',
    });
  }).catch(err => {
  });
}

exports.getStationeryItems = (req, res, next) => {
  Product.find({ category: 'Stationary Items' }).then(products => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      products: products,
      pageTitle: 'Stationery Items',
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'Stationery Items',
      titleDescription: 'stationery items',
    });
  }).catch(err => {
  });
}

exports.getPersonalCareProducts = (req, res, next) => {
  Product.find({ category: 'Personal Care' }).then(products => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      products: products,
      pageTitle: 'Personal Care Items',
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'Personal Care',
      titleDescription: 'personal care items',
    });
  }).catch(err => {
  });
}

//get Product Controllers
exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render('products', {
      isLoggedIn: req.isLoggedIn,
      pageTitle: 'EcoNest | Kitchen & Dining',
      products: products,
      cssPage: '/css/ecoliststyle.css',
      titleHeading: 'All Products',
      titleDescription: 'all products',
      // isLoggedIn: req.isLoggedIn,
    });
  }).catch(err => {
    res.send(`
      <h1>Error Fetching Products</h1>
      <a href="/">Go to Home</a>
   `);
  })
};

//product details page Controller render issue

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId).then(product => {
    if (!product) {
      return res.send(`
        <h1>Product Not Found</h1>
        <a href="/product">Go to Products</a>
      `);
    }

    res.render('detailsPage', {
      isLoggedIn: req.isLoggedIn,
      product: product,
    });

  }).catch(err => {
    console.log('Error fetching product details from DB', err);
  });
}