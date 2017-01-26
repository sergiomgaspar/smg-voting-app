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
  id: int
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
  selectedRow=0;
  countItems=0;
  $http;

  /*@ngInject*/
  constructor($state, $http) {
    this.$state = $state;
    this.$http = $http;
  }

  addPoll(form){
    
    this.submitted = true;
    if(form.$valid && this.countItems > 1) {
        
        // POST + Json.stringify do this.poll
//        var msg = JSON.stringify(angular.toJson(this.poll)); // Use this func because of angular DOM stuff
 //       var msg = JSON.stringify(this.poll);
  var msg = angular.toJson(this.poll); // Use this func because of angular DOM stuff
        console.log("this.poll: "+msg);
        this.$http({
        url: '/api/polls',
        method: "POST",
              //data:JSON.stringify(this.poll)
              
             data: msg
          })
          .then(function(response) {
                  // success
                  console.log("POST WORKED: "+response);
          }, 
          function(response) { // optional
                  // failed
                  console.log("POST FAILED: "+response)
          });
        this.resetPolls();
    }
  }


  addItem(){
    if (this.nextItem !== undefined && this.nextItem !== null && this.nextItem.length > 0) {
        this.poll.items.push({
          name:this.nextItem,
          votes: 0,
          id: this.countItems
      });
      this.countItems++;
    }
  }
  
  // TODO: Remove and "re-arrange" the Item array [index = this.selectedRow]
  removeItem(){
    console.log("removing item: "+this.selectedRow);
    this.countItems--;
  }

  rowHighilited=function(row)
    {
      this.selectedRow = row;    
    }

// Reset the poll and allow for the insert of a new one
// TODO: Fazer reset do poll (não fica bem definido e qdo tento adicionar item depois do submit, estoira com o push() pq não conhece items como [])
    resetPolls(){
       // this.poll = new this.Poll();
        this.submitted = false;
          this.nextItem='';
  this.selectedRow=0;
  this.countItems=0;
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
