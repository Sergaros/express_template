'use strict'
const expc = require('expect');
const agent = require('supertest');
const app = require('../server');

describe('Koa template server test', ()=>{
    let request;

    before(()=>{
        request = agent(app);
    });

    it('GET /', (done)=>{
        request.get('/')
          .expect('Content-Type', /text\/html/)
          .expect('Content-Length', '1317')
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
    });

    it('GET /content', (done)=>{
        request.get('/content')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response=>{
              expc(Array.isArray(response.body)).toBe(true);
              expc(response.body.find(i=>i.name==='Alex').age).toBe(25);
              expc(response.body.find(i=>i.name==='Bob').age).toBe(21);
              expc(response.body.find(i=>i.name==='Alice').age).toBe(24);
             done();
         });
    });

    it('POST /content', (done)=>{
        request.post('/content')
          .send({name: "John", age: 31})
          .expect(200)
          .then(response=>{
             expc(response.text).toBe('OK');
             done();
         });
    });

    it('DELETE /content', (done)=>{
        request.delete('/content')
          .send({name: 'Alex'})
          .expect(200)
          .then(response=>{
             expc(response.text).toBe('OK');
             done();
         });
    });

    it('GET /error', (done)=>{
        request.get('/error')
          .expect(500)
          .then(response=>{
             done();
         });
    });
});
