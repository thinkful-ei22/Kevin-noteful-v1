'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');

const app = express();
app.use(express.static('public'));



// ADD STATIC SERVER HERE
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
  const id = req.params.id;
  const dataNew = data.find(item => item.id ===Number(id));
  return res.json(dataNew);
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});