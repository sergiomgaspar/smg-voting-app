'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './mypolls.routes';

var Chart = require('chart.js')

export class MypollsComponent {
    selectedRow = -1;
  selectedItemRow = -1;
  newItemName = '';
polls = [];
  chart = {
    data:'',
    labels:'',
    series:''
  };
// Initialize bar chart
  myChart = new Chart(pollsChart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            data: [],
            // After 6 items, color is grey
            // can be fixed by a new function using (index % 6) and taking the value to "repeat" the color
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
        ],
            borderWidth: 1
        }]
    },
    options: {
      legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

	// Instances of global objects
	$http;
  Auth;

	/*@ngInject*/
  constructor($http, Auth) { 
    this.$http = $http;
    this.Auth = Auth;
  }
 
  $onInit() {
    this.$http.get('/api/polls/'+this.Auth.getCurrentUserSync()._id)
      .then(response => {
        this.polls = response.data;
      });
      
  }
  
  rowSelected = function(row) {
		this.selectedRow = row;
    this.selectedItemRow = -1;
    this.newItemName = '';
    this.refreshGraph(); 
	}

  itemSelected = function(row){
    this.selectedItemRow = row;
  }

  refreshGraph = function (){
    if (this.selectedRow < 0) return;

    this.myChart.data.labels.splice(0,this.myChart.data.labels.length);
    this.myChart.data.datasets[0].data.splice(0,this.myChart.data.datasets[0].data.length);
  
    for (var i = 0; i < this.polls[this.selectedRow].items.length; i++){
      this.myChart.data.labels.push(this.polls[this.selectedRow].items[i].name);
      this.myChart.data.datasets[0].data.push(this.polls[this.selectedRow].items[i].votes);
    };
    this.myChart.update();
  };

  voteItem = function (){
    if (this.selectedItemRow < 0) return;
    // Change view
    this.polls[this.selectedRow].items[this.selectedItemRow].votes++;

    // Post vote using API
    // PUT     /api/polls/:id
    this.$http.put('/api/polls/'+this.polls[this.selectedRow]._id
        , this.polls[this.selectedRow])
        .then(function(response) {
						console.log("Vote posted.");
					},
					function(response) { // optional
						console.log("Error while posting vote.");
					});
     
    console.log("ID: "+this.polls[this.selectedRow]._id);

    this.refreshGraph();
    this.selectedItemRow = -1;
  };

  deletePoll = function(){
    if (this.selectedRow < 0) return;
      this.$http.delete('/api/polls/'+this.polls[this.selectedRow]._id)
      .then(function(response) {
						console.log("Poll deleted.");
					},
					function(response) {
						console.log("Error while deleting poll.");
					});
      this.polls.splice(this.selectedRow,1);
      this.selectedRow = -1;
  };

  addItem = function(){
    if (this.selectedRow < 0) return;
    var itemId = this.polls[this.selectedRow].items.length;
    this.polls[this.selectedRow].items.push({
      name: this.newItemName,
      votes: 0,
      id: itemId
    });
    this.postUpdate();
    this.newItemName = '';
  };

  removeItem = function(){
    if (this.selectedItemRow < 0) return;
    this.polls[this.selectedRow].items.splice(this.selectedItemRow, 1);
    this.postUpdate();
    this.selectedItemRow = -1;
  };

  postUpdate = function(){
    // Post vote using API
    // PUT     /api/polls/:id
    this.$http.put('/api/polls/'+this.polls[this.selectedRow]._id
        , this.polls[this.selectedRow])
        .then(function(response) {
						console.log("Poll Updated.");
					},
					function(response) { // optional
						console.log("Could not update existing poll.");
					});
    this.refreshGraph();
  };

  refreshGraph = function (){
    if (this.selectedRow < 0) return;

    this.myChart.data.labels.splice(0,this.myChart.data.labels.length);
    this.myChart.data.datasets[0].data.splice(0,this.myChart.data.datasets[0].data.length);
  
    for (var i = 0; i < this.polls[this.selectedRow].items.length; i++){
      this.myChart.data.labels.push(this.polls[this.selectedRow].items[i].name);
      this.myChart.data.datasets[0].data.push(this.polls[this.selectedRow].items[i].votes);
    };
    this.myChart.update();
  };
}

MypollsComponent.$inject = ['$http','Auth'];

export default angular.module('smgVotingAppApp.mypolls', [uiRouter])
  .config(routes)
  .component('mypolls', {
    template: require('./mypolls.html'),
    controller: MypollsComponent,
    controllerAs: 'mypollsCtrl'
  })
  .name;
