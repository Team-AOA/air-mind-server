// const createError = require('http-errors');
require('dotenv').config();
const express = require('express');
const session = require('express-session');

const indexRouter = require('./routes/index');

require('./configs/dbConfig')();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
    },
  }),
);

app.use('/', indexRouter);
app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

app.use(function generalErrorHandler(err, req, res) {
  const responseBody = {
    result: 'error',
    error: {
      message: err.message,
      code: err.status || 500,
    },
  };

  res.json(responseBody);
});

module.exports = app;
