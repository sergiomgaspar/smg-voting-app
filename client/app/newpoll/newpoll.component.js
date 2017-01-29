'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './newpoll.routes';

type Poll = {
	title: string;
	description: string;
	createWho: string;
	createWhoId: string;
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

	/* Flags to help in show/hide hints in html */
	submitted = false;
	PostOK = false;
	PostError = false;

	// Specific class variables
	nextItem = '';
	selectedRow = -1;
	countItems = 0;

	// Instances of global objects
	$http;
	Auth;
	$state;

	/*@ngInject*/
	constructor(Auth, $state, $http) {
		this.$state = $state;
		this.$http = $http;
		this.Auth = Auth;
	}

	addPoll(form) {

		this.submitted = true;
		if (form.$valid && this.countItems > 1) {
			this.poll.createWho = this.Auth.getCurrentUserSync().name;
			this.poll.createWhoId = this.Auth.getCurrentUserSync()._id;
			var msg = angular.toJson(this.poll); // Use this func because of angular DOM stuff
			this.$http({
					url: '/api/polls',
					method: "POST",
					data: msg
				})
				.then(function(response) {
						//this.$state.go('main');
						console.log("Poll added");
					},
					function(response) { // optional
						console.log("Error while posting poll");
					});
			this.resetPolls();
		}
	}

	updatePosted(status){
		if (status) 
			this.PostOK = true;
		else
			this.PostError = true;
	}

	addItem() {
		if (this.nextItem !== undefined && this.nextItem !== null && this.nextItem.length > 0) {
			
			this.poll.items.push({
				name: this.nextItem,
				votes: 0,
				id: this.countItems
			});
			this.countItems++;
		}
	}

	removeItem(rowNum) {
		//console.log("removing item: " + this.selectedRow);
		var removed = this.poll.items.splice(rowNum, 1);
		for (var i = 0; i < this.poll.items.length; i++) {
			this.poll.items[i].id = i;
		};
		this.countItems--;
	}

	rowHighilited = function(row) {
		this.selectedRow = row;
	}

	resetPolls() {
		// this.poll = new this.Poll();
		this.submitted = false;
		this.nextItem = '';
		this.selectedRow = 0;
		this.countItems = 0;
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