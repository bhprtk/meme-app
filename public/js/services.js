'use strict';

var app = angular.module('memeApp');

app.service('Users', function($http) {

  this.getCurrentUser = (email) => $http.get(`/users/getCurrentUser/${email}`);

});

app.service('Images', function($http) {

  this.getAllImages = () => $http.get(`/images/getAll`);

  this.upvoteById = (postId) => $http.put(`/images/upvoteById/${postId}`);

  this.downvoteById = (postId) => $http.put(`/images/downvoteById/${postId}`);

});
