'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var pollsCtrlStub = {
  index: 'pollsCtrl.index',
  show: 'pollsCtrl.show',
  create: 'pollsCtrl.create',
  upsert: 'pollsCtrl.upsert',
  patch: 'pollsCtrl.patch',
  destroy: 'pollsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pollsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './polls.controller': pollsCtrlStub
});

describe('Polls API Router:', function() {
  it('should return an express router instance', function() {
    expect(pollsIndex).to.equal(routerStub);
  });

  describe('GET /api/polls', function() {
    it('should route to polls.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pollsCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/polls/:id', function() {
    it('should route to polls.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pollsCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/polls', function() {
    it('should route to polls.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pollsCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/polls/:id', function() {
    it('should route to polls.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pollsCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/polls/:id', function() {
    it('should route to polls.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pollsCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/polls/:id', function() {
    it('should route to polls.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pollsCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
