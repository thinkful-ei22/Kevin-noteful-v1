'use strict';

// Load array of notes
const data = require('./db/notes');

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();
app.use(express.static('public'));
const { PORT } = require('./config');
const {loggerMiddleware} = require('./middleware/logger');

app.use(loggerMiddleware);

app.get('/api/notes', (req, res) => {
  console.log('i sent a get request');
  const {searchTerm} = req.query;
  if(searchTerm){
    const newData = data.filter (item => item.title.includes(searchTerm));
    res.json(newData);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const {id} = req.params;
  const dataNew = data.find(item => item.id ===Number(id));
  return res.json(dataNew);
});

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
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
