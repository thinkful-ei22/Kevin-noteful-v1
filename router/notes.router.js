'use strict';
const express = require('express');
const routerNotes = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

routerNotes.get('/', (req, res, next) => {
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
  
routerNotes.get('/:id', (req, res, next) => {
  console.log('id ran');
  const {id} = req.params;
  // notes.find(id, (err, item) =>{
  //   if(err){
  //     return res.status(404).next(err);
  //   }
  notes.find(id, (err, item) => {
    if (err) {
      console.log('error', err);
      return next(err);
    }
    if (item) {
      res.json(item);
    }else {
      console.log('item not found');
      next();
    }
  });
});
  
routerNotes.put('/:id', (req, res, next) => {
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

// Post (insert) an item
routerNotes.post('/', (req, res, next) => {
  const { title, content } = req.body;
  
  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

routerNotes.delete('/:id', (req, res, next) => {
  console.log('delete ran');
  const {id} = req.params;
  console.log(id);
  notes.delete(id, (err, lenArr) => {
    if (lenArr) {
      console.log(lenArr);
      res.status(204).end();
    } else {
      next();
    }
  });
});

module.exports = {routerNotes};
  