const http = require('http');
const path = require('path');
const mongodb = require('mongodb');

const express = require('express');
const mongoose = require('mongoose');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
// const authRouter = require('./routes/authRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

// app.use((req, res, next) => {
//   req.isLoggedIn = req.get('Cookie')?.split('=')[1] || false;
//   next();
// });

// app.use(authRouter);
app.use(storeRouter);

// app.use('/host', (req, res, next) => {
//   if (req.isLoggedIn) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// });

app.use(hostRouter);



const DB_PATH = "mongodb://localhost:27017/EcoShopDb";
// const DB_PATH = "mongodb+srv://dhruvaa866:dhruvaadbroot@05@completecoding.z7yhero.mongodb.net/econestDb";

const PORT = 3000;
mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongodb');
  server.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while conecting to db', err);
});
