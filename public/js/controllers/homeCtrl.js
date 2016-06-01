'use strict';

var app = angular.module('memeApp');

app.controller('homeCtrl', function($scope, images, Images, $sessionStorage, Users) {


  $scope.points = 0;
  $scope.images = images.reverse();


  function addPoints(image, imagesIndex) {
    Images.upvoteById(image._id)
    .then((updatedImage) => {
      Users.addUpvoteToUser(updatedImage._id, $sessionStorage.currentUser._id)
      .then((updatedUser) => {
        $scope.images[imagesIndex].points = updatedImage.data.points;
      })
    });

  };

  function subtractPoints(image, imagesIndex) {
    Images.downvoteById(image._id)
    .then((updatedImage) => {
      Users.addDownvoteToUser(updatedImage._id, $sessionStorage.currentUser._id)
      .then((updatedUser) => {
        $scope.images[imagesIndex].points = updatedImage.data.points;
      })
    });


  };

  $scope.upvote = function(image, imagesIndex) {

    if(!$scope.upvoteClass && !$scope.downvoteClass) {
      addPoints(image, imagesIndex);
      $scope.upvoteClass = "turn-blue";
      $scope.downvoteClass = null;
    } else if(!$scope.upvoteClass && $scope.downvoteClass) {
      addPoints(image, imagesIndex);
      $scope.downvoteClass = null;

    } else {
      subtractPoints(image, imagesIndex);
      $scope.upvoteClass = null;
    }




};

  $scope.downvote = function(image, imagesIndex) {

    if(!$scope.downvoteClass  && !$scope.upvoteClass) {
      subtractPoints(image, imagesIndex);
      $scope.downvoteClass = "turn-red";
      $scope.upvoteClass = null;

    } else if(!$scope.downvoteClass && $scope.upvoteClass) {
      subtractPoints(image, imagesIndex);
      $scope.upvoteClass = null;

    } else {
      addPoints(image, imagesIndex);
      $scope.downvoteClass = null;
    }


  };


});
