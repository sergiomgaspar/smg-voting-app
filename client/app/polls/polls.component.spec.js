'use strict';

describe('Component: PollsComponent', function() {
  // load the controller's module
  beforeEach(module('smgVotingAppApp.polls'));

  var PollsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PollsComponent = $componentController('polls', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
