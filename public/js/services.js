'use strict';

var app = angular.module('memeApp');

app.service('Users', function($http, $sessionStorage) {

    this.addUploadedImage = (imageId, userId) => $http.put(`/users/addUploadedImage/${userId}`, {
        imageId: imageId
    });

    this.getCurrentUser = (email) => $http.get(`/users/getCurrentUser/${email}`);

    this.getUserById = (userId) => $http.get(`/users/getUserById/${userId}`);

    this.addUpvoteToUser = (imageId, userId) => {

        return $http.put(`/users/addUpvote/${userId}`, {
                imageId: imageId
            })
            .then(res => {
                $sessionStorage.currentUser = res.data;
            });
    };

    this.findIfLiked = (imageId, userId) => $http.put(`/users/findIfLiked/${userId}`, {
        imageId: imageId
    });

    this.removeFromLiked = (imageId, userId) => {
        return $http.put(`/users/removeFromLiked/${userId}`, {
                imageId: imageId
            })
            .then(res => {
                $sessionStorage.currentUser = res.data;
            });

    }

    this.addDownvoteToUser = (imageId, userId) => {
        return $http.put(`/users/addDownvote/${userId}`, {
                imageId: imageId
            })
            .then(res => {
                $sessionStorage.currentUser = res.data;
            });

    };

    this.findIfDisliked = (imageId, userId) => $http.put(`/users/findIfDisliked/${userId}`, {
        imageId: imageId
    });

    this.removeFromDisliked = (imageId, userId) => {
        return $http.put(`/users/removeFromDisliked/${userId}`, {
                imageId: imageId
            })
            .then(res => {
                $sessionStorage.currentUser = res.data;
            });

    };

    this.getLikedPosts = (userId) => $http.get(`/users/getLikedPosts/${userId}`);

    this.getUploadedPosts = (userId) => $http.get(`/users/getUploadedPosts/${userId}`);

    this.saveNewName = (userId, newName) => $http.put(`/users/updateName/${userId}`, {newName: newName});

    this.deletePost = (userId, imageId) => $http.delete(`/users/removePost/${userId}?imageId=${imageId}`);

    this.addComment = (userId, imageId) => $http.post(`/users/addComment/${userId}`, {imageId: imageId});

});

app.service('Images', function($http) {

    this.getAllImages = () => $http.get(`/images/getAll`);

    this.upvoteById = (postId) => $http.put(`/images/upvoteById/${postId}`);

    this.downvoteById = (postId) => $http.put(`/images/downvoteById/${postId}`);

    this.deletePost = (postId) => $http.delete(`/images/deleteById/${postId}`);

    this.addComment = (imageId, comment) => $http.post(`/images/addComment/${imageId}`, comment);

    this.getComments = (imageId) => $http.get(`/images/getComments/${imageId}`);

});
