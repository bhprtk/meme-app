'use strict';

var app = angular.module('memeApp');

app.controller('homeCtrl', function($scope, images, Images, $sessionStorage, Users) {


  $scope.points = 0;
  $scope.images = images.reverse();

  $scope.upvote = function(image) {

    if(!$scope.upvoteClass) {
      $scope.upvoteClass = "turn-blue";
    } else {
      $scope.upvoteClass = null;
    }




};

  $scope.downvote = function(image) {
    console.log('downvoted');


    if(!$scope.downvoteClass) {
      $scope.downvoteClass = "turn-red";
    } else {
      $scope.downvoteClass = null;
    }


  };


});
