'use strict';

describe('Component: NewpollComponent', function() {
  // load the controller's module
  beforeEach(module('smgVotingAppApp.newpoll'));

  var NewpollComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewpollComponent = $componentController('newpoll', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
