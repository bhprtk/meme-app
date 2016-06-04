'use strict';

var app = angular.module('memeApp');

app.controller('profileCtrl', function($scope, $state, $sessionStorage, Users) {

  $scope.currentUser = $sessionStorage.currentUser;

  $scope.likedPosts = function() {
    $scope.likedActive = "currentTab";
    $scope.uploadedActive = null;

     $state.go('profile.home', {get: 'liked'});
  };

  $scope.uploadedPosts = function() {
    $scope.uploadedActive = "currentTab";
    $scope.likedActive = null;

    $sessionStorage.currentUser.get = 'uploaded';
    $state.go('profile.home', {get: 'uploaded'});

  };

});
