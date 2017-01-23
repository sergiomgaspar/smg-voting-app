'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mypolls.routes';

export class MypollsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('smgVotingAppApp.mypolls', [uiRouter])
  .config(routes)
  .component('mypolls', {
    template: require('./mypolls.html'),
    controller: MypollsComponent,
    controllerAs: 'mypollsCtrl'
  })
  .name;
