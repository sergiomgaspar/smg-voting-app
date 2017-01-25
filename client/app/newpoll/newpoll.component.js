'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newpoll.routes';

type Poll = {
  title: string;
  description: string;
  createWho: string;
  items: Item[];
};

type Item = {
  name: string;
  votes: int;
};

export class NewpollComponent {
  poll: Poll = {
    title: '',
    description: '',
    createWho: '',
    items: []
  };

  submitted = false;
  $state;
  nextItem='';
  /*@ngInject*/
  constructor($state) {
    this.message = 'Hello';
    this.$state = $state;
    this.poll.items = [{name:"AAA"},{name:"BBB"}];
  }

  addPoll(form){
    
    this.submitted = true;
    if(form.$valid) {
      
     /*return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });*/
        console.log("this.poll.title: "+this.poll.title);
        console.log("this.poll.description: "+this.poll.description);
    } 
  }

  addItem(form2){
    console.log('ADD ITEM!!!');
    if(form2.$valid) {
        console.log("this.poll.nextItem: "+this.nextItem);
        this.poll.items.push({name:this.nextItem});

    } 
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
