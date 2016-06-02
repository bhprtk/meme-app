'use strict';

var app = angular.module('memeApp');

app.controller('homeCtrl', function($scope, images, Images, $sessionStorage, Users) {

  var currentUser = $sessionStorage.currentUser;


  $scope.points = 0;
  $scope.images = images.reverse();


  $scope.upvote = function(image, imagesIndex) {

    if(!$scope.upvoteClass && !$scope.downvoteClass) {//
      // Images.upvoteById
      // Users.addUpvote
      // Users.removeFromDisliked

      Images.upvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });
      Users.addUpvoteToUser(image._id, currentUser._id);
      Users.removeFromDisliked(image._id, currentUser._id);

      $scope.upvoteClass = "turn-blue";

    } else if(!$scope.upvoteClass && $scope.downvoteClass) {//
      // Images.upvoteById
      // Users.removeFromDisliked

      Images.upvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

      Users.removeFromDisliked(image._id, currentUser._id);

      $scope.downvoteClass = null;

    } else if($scope.upvoteClass && !$scope.downvoteClass) {//
      // Images.downvoteById
      // Users.removeFromLiked

      Images.downvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

      Users.removeFromLiked(image._id, currentUser._id);
      $scope.upvoteClass = null;

    }

};

  $scope.downvote = function(image, imagesIndex) {

    if(!$scope.downvoteClass  && !$scope.upvoteClass) {//
      // Images.downvoteById
      // Users.addDownvote
      // Users.removeFromLiked

      Images.downvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

      Users.addDownvoteToUser(image._id, currentUser._id);
      Users.removeFromLiked(image._id, currentUser._id);

      $scope.downvoteClass = "turn-red";

    } else if($scope.upvoteClass && !$scope.downvoteClass) {//
      // Images.downvoteById
      // Users.removeFromLiked

        Images.downvoteById(image._id)
          .then(res => {
            $scope.images[imagesIndex].points = res.data.points;
          });

        Users.removeFromLiked(image._id, currentUser._id);
        $scope.upvoteClass = null;
    }
    else if(!$scope.upvoteClass && $scope.downvoteClass) {//
      // Images.upvoteById
      // Users.removeFromDisliked

      Images.upvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

      Users.removeFromDisliked(image._id, currentUser._id);
      $scope.downvoteClass = null;

    }

  };


});
