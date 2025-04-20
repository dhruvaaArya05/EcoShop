require('dotenv').config();

const http = require('http');
const path = require('path');
const mongodb = require('mongodb');

const express = require('express');
const mongoose = require('mongoose');
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

app.use(express.urlencoded());


app.use((req, res, next) => {
  req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : false;
  next();
})

// app.use(authRouter);
app.get('/login', (req, res, next) => {
  res.render('auth/login', {
    isLoggedIn: req.isLoggedIn,
  });
});

app.post('/login', (req, res, next) => {
  res.cookie("isLoggedIn", true);
  // req.isLoggedIn = true;
  res.redirect("/");
});

app.post('/logout', (req, res, next) => {
  res.cookie("isLoggedIn", false);
  res.redirect("/");
});

// app.use(authRouter);
app.use(storeRouter);



app.use('/host', (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
})

app.use(hostRouter);

const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://dhruvaa866:dhruvaadbroot%4005@completecoding.z7yhero.mongodb.net/econestDb?retryWrites=true&w=majority&appName=CompleteCoding").then(() => {
  server.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  // console.log('error connecting db', err);
});
