'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './polls.routes';

export class PollsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('smgVotingAppApp.polls', [uiRouter])
  .config(routes)
  .component('polls', {
    template: require('./polls.html'),
    controller: PollsComponent,
    controllerAs: 'pollsCtrl'
  })
  .name;
