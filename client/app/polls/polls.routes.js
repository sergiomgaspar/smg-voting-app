'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('polls', {
      url: '/polls',
      template: '<polls></polls>'
    });
}
