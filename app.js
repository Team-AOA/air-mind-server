require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const {
  homeRouter,
  userRouter,
  mindMapRouter,
  nodeRouter,
} = require('./routes/index');

const app = express();

require('./configs/dbConfig')();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/users/:userId/mind-maps', mindMapRouter);
app.use('/users/:userId/mind-maps/:mindMapId/nodes', nodeRouter);

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
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
