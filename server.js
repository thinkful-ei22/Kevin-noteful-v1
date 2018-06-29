'use strict';
// Load array of notes

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.json());
const { PORT } = require('./config');
const morgan = require('morgan');
app.use(morgan('dev'));

const {routerNotes} = require('./router/notes.router');

app.use('/api/notes', routerNotes);


// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

if(require.main ===module){
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = {app};