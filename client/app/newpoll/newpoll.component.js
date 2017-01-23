'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newpoll.routes';

export class NewpollComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('smgVotingAppApp.newpoll', [uiRouter])
  .config(routes)
  .component('newpoll', {
    template: require('./newpoll.html'),
    controller: NewpollComponent,
    controllerAs: 'newpollCtrl'
  })
  .name;
