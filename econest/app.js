require('dotenv').config();

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

app.use(express.urlencoded());

// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });

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


// mongodb://dhruvaa866:dhruvaadbroot%4005@ac-ds6tvzi-shard-00-00.z7yhero.mongodb.net:27017,ac-ds6tvzi-shard-00-01.z7yhero.mongodb.net:27017,ac-ds6tvzi-shard-00-02.z7yhero.mongodb.net:27017/?ssl=true&replicaSet=atlas-wv8qhm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=CompleteCoding"


// const DB_PATH = "mongodb://localhost:27017/EcoShopDb";
// const DB_PATH = "mongodb+srv://dhruvaa866:dhruvaadbroot@05@completecoding.z7yhero.mongodb.net/econestDb";

const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://dhruvaa866:dhruvaadbroot%4005@completecoding.z7yhero.mongodb.net/econestDb?retryWrites=true&w=majority&appName=CompleteCoding").then(() => {
  server.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  // console.log('error connecting db', err);
});
