'use strict';

var app = angular.module('memeApp');

app.service('Users', function($http) {

  this.getCurrentUser = (email) => $http.get(`/users/getCurrentUser/${email}`);

  this.addUpvoteToUser = (imageId, userId) => $http.put(`/users/addUpvote/${userId}`, {imageId: imageId});

  this.findIfLiked = (imageId, userId) => $http.put(`/users/findIfLiked/${userId}`, {imageId: imageId});

  this.removeFromLiked = (imageId, userId) => $http.put(`/users/removeFromLiked/${userId}`, {imageId: imageId});

  this.addDownvoteToUser = (imageId, userId) => $http.put(`/users/addDownvote/${userId}`, {imageId: imageId});

  this.findIfDisliked = (imageId, userId) => $http.put(`/users/findIfDisliked/${userId}`, {imageId: imageId});

  this.removeFromDisliked = (imageId, userId) => $http.put(`/users/removeFromDisliked/${userId}`, {imageId: imageId});

});

app.service('Images', function($http) {

  this.getAllImages = () => $http.get(`/images/getAll`);

  this.upvoteById = (postId) => $http.put(`/images/upvoteById/${postId}`);

  this.downvoteById = (postId) => $http.put(`/images/downvoteById/${postId}`);

});
