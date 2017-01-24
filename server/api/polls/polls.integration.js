'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPolls;

describe('Polls API:', function() {
  describe('GET /api/pollss', function() {
    var pollss;

    beforeEach(function(done) {
      request(app)
        .get('/api/pollss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pollss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pollss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pollss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pollss')
        .send({
          name: 'New Polls',
          info: 'This is the brand new polls!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPolls = res.body;
          done();
        });
    });

    it('should respond with the newly created polls', function() {
      expect(newPolls.name).to.equal('New Polls');
      expect(newPolls.info).to.equal('This is the brand new polls!!!');
    });
  });

  describe('GET /api/pollss/:id', function() {
    var polls;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pollss/${newPolls._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          polls = res.body;
          done();
        });
    });

    afterEach(function() {
      polls = {};
    });

    it('should respond with the requested polls', function() {
      expect(polls.name).to.equal('New Polls');
      expect(polls.info).to.equal('This is the brand new polls!!!');
    });
  });

  describe('PUT /api/pollss/:id', function() {
    var updatedPolls;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pollss/${newPolls._id}`)
        .send({
          name: 'Updated Polls',
          info: 'This is the updated polls!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPolls = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPolls = {};
    });

    it('should respond with the updated polls', function() {
      expect(updatedPolls.name).to.equal('Updated Polls');
      expect(updatedPolls.info).to.equal('This is the updated polls!!!');
    });

    it('should respond with the updated polls on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pollss/${newPolls._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let polls = res.body;

          expect(polls.name).to.equal('Updated Polls');
          expect(polls.info).to.equal('This is the updated polls!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pollss/:id', function() {
    var patchedPolls;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pollss/${newPolls._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Polls' },
          { op: 'replace', path: '/info', value: 'This is the patched polls!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPolls = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPolls = {};
    });

    it('should respond with the patched polls', function() {
      expect(patchedPolls.name).to.equal('Patched Polls');
      expect(patchedPolls.info).to.equal('This is the patched polls!!!');
    });
  });

  describe('DELETE /api/pollss/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pollss/${newPolls._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when polls does not exist', function(done) {
      request(app)
        .delete(`/api/pollss/${newPolls._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
