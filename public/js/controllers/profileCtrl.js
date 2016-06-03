'use strict';

var app = angular.module('memeApp');

app.controller('profileCtrl', function($scope, $state, $sessionStorage) {
  $scope.showLikedPosts = false;

  console.log($sessionStorage.currentUser);

  $scope.likedPosts = function() {
    $scope.likedActive = "active";
    $scope.uploadedActive = null;
    $scope.showLikedPosts = true;
    var likedPosts = $sessionStorage.currentUser.liked;

    $state.go('profile.home');
  }

  $scope.uploadedPosts = function() {
    $scope.uploadedActive = "active";
    $scope.likedActive = null;
  }

});
