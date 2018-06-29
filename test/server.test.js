'use strict';
const {app} = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {


  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
  
});
  
describe('404 handler', function () {
  
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
  
});

describe('GET /api/notes', function () {
  
  it('should return the default 10 notes', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(10);
      });
  });
  it('Get request good fields', function(){
    return chai.request(app)
      .get('/api/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(10);
        res.body.forEach(function(item){
          expect(item).to.be.a('object');
          expect(item).to.include.keys('id', 'title', 'content');
        });
        
      });
  });

  it('Get request good searchTerm', function(){
    return chai.request(app)
      .get('/api/notes?searchTerm=about%20cats')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(4);
        expect(res.body[0]).to.be.an('object');
      });
  });

  it('Get request bad searchTerm', function(){
    return chai.request(app)
      .get('/api/notes?searchTerm=Not%20a')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(0);
      });
  });
});

describe('get specific object', function (){

//   it('should return an object of that id', function (){
//     return chai.request(app)
//       .get('/api/notes/1004')
//       .then(function (res) {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.include.keys('id', 'title', 'content');
//         expect(res.body.id).to.equal(1004);
//         expect(res.body.title).to.equal('7 things lady gaga has in common with cats');
//       });
//   });
     
  it('should return a 404 of that incorrect id', function (){
    return chai.request(app)
      .get('/api/notes/9999')
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });
});

describe('post a new note', function(){
  it('should post a new note and return it', function (){
    const newItem = {'title': 'wwwwwwwww', 'content': 'asfaeqweqweqw'};
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function(res){
        expect(res).to.have.status(201);
        expect(res).to.be.json;
      });
  });
  it('should post a note with no title and return an error message', function (){
    const newItem = {'content': 'asfaeqweqweqw'};
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .catch(function(err){err.response;})
      .then(function(res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to
          .equal('Missing `title` in request body');
      });
  });
});

