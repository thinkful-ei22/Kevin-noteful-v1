'use strict';
/* globals next*/
// Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.json());
const { PORT } = require('./config');
const {loggerMiddleware} = require('./middleware/logger');

app.use(loggerMiddleware);

app.get('/api/notes', (req, res) => {
  console.log('i sent a get request');
  const {searchTerm} = req.query;
  // if(searchTerm){
  //   const newData = data.filter (item => item.title.includes(searchTerm));
  //   res.json(newData);
  // } else {
  //   res.json(data);
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

// app.get('/api/notes/:id', (req, res) => {
//   const {id} = req.params;
//   const dataNew = data.find(item => item.id ===Number(id));
//   return res.json(dataNew);
// });

app.get('/api/notes/:id', (req, res) => {
  console.log('id ran');
  const {id} = req.params;
  notes.find(id, (err, item) =>{
    if(err){
      return next(err);
    }
    res.json(item);
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  console.log('put ran');
  const {id} = req.params;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
      console.log(updateObj);
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
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
