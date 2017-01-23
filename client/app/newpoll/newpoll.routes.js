'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newpoll', {
      url: '/newpoll',
      template: '<newpoll></newpoll>',
	  authenticate: 'user'
    });
}
