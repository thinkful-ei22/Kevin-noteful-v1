'use strict';

// const morgan = require('morgan');

// const {app} = require('./server');

// app.use(morgan('common'));

const loggerMiddleware = function(req, res, next){
  const now = new Date();
  console.log(
    `${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
};

module.exports = {loggerMiddleware};