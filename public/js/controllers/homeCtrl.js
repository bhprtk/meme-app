'use strict';

var app = angular.module('memeApp');

app.controller('homeCtrl', function($scope, $state, images, Images, $sessionStorage, Users, $mdDialog) {


  $scope.images = images.reverse();
  $scope.showComments = false;
  $scope.newComment = {};


  $scope.images.forEach(image => {
    if($sessionStorage.currentUser) {
      if($sessionStorage.currentUser.liked.indexOf(image._id) > -1) {
        image.upvoteClass = "turn-blue";
        image.downvoteClass = null;
      } else if($sessionStorage.currentUser.disliked.indexOf(image._id) > -1) {
        image.downvoteClass = "turn-red";
        image.upvoteClass = null;
      } else {
        image.upvoteClass = null;
        image.downvoteClass = null;
      }
    } else {
      image.upvoteClass = null;
      image.downvoteClass = null;
    }
    image.showComments = false;
    image.commentClass = null;
  });


  $scope.submitComment = function(image, imagesIndex) {
    var comment = {
      comment: $scope.newComment.comment,
      commentedBy: $sessionStorage.currentUser._id
    }
    Images.addComment(image._id, comment)
      .then(res => {
        console.log('res after comment', res);
        Images.getComments(res.data._id)
          .then(res => {
            image.comments = res.data.reverse();
            $scope.newComment.comment = null;
          });
        Users.addComment($sessionStorage.currentUser._id, res.data._id)
          .then(res => {
            $sessionStorage.currentUser = res.data;
          });
      });

  }


  $scope.comments = function(image, imagesIndex) {
    if(!image.commentClass) {
      image.commentClass = 'turn-red';
      image.showComments = true;
      Images.getComments(image._id)
        .then(res => {
          image.comments = res.data.reverse();
        })
        .catch(err => {
          console.log('err after getComments', err);
        })
    } else {
      image.commentClass = null;
      image.showComments = false;
    }
  }

  $scope.removePost = function(image) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this post?')
          .ok('Yes please')
          .cancel('Not sure');
    $mdDialog.show(confirm)
      .then(function() {
        Images.deletePost(image._id)
          .then(res => {
            Users.deletePost($sessionStorage.currentUser._id, image._id)
              .then(res => {
                $sessionStorage.currentUser = res.data;
                $state.go($state.current, {}, {reload: true});
              })
          });
      });
  };

  $scope.isLoggedIn = function() {
    if($sessionStorage.currentUser) {
      $state.go('upload');
    } else {
      $state.go('login');
    }
  };

  $scope.upvote = function(image, imagesIndex) {

    if(!$sessionStorage.currentUser) {
      $state.go('login');

    } else {

      if(!image.upvoteClass && !image.downvoteClass) {//
        // Images.upvoteById
        // Users.addUpvote
        // Users.removeFromDisliked

        Images.upvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });
        Users.addUpvoteToUser(image._id, $sessionStorage.currentUser._id);
        Users.removeFromDisliked(image._id, $sessionStorage.currentUser._id);

        image.upvoteClass = "turn-blue";

      } else if(!image.upvoteClass && image.downvoteClass) {//
        // Images.upvoteById
        // Users.removeFromDisliked

        Images.upvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

        Users.removeFromDisliked(image._id, $sessionStorage.currentUser._id);

        image.downvoteClass = null;

      } else if(image.upvoteClass && !image.downvoteClass) {//
        // Images.downvoteById
        // Users.removeFromLiked

        Images.downvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

        Users.removeFromLiked(image._id, $sessionStorage.currentUser._id);

        image.upvoteClass = null;

      }

    }


};

  $scope.downvote = function(image, imagesIndex) {

    if(!$sessionStorage.currentUser) {
      $state.go('login');
    } else {
      if(!image.downvoteClass  && !image.upvoteClass) {//
        // Images.downvoteById
        // Users.addDownvote
        // Users.removeFromLiked

        Images.downvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

        Users.addDownvoteToUser(image._id, $sessionStorage.currentUser._id);
        Users.removeFromLiked(image._id, $sessionStorage.currentUser._id);

        image.downvoteClass = "turn-red";

      } else if(image.upvoteClass && !image.downvoteClass) {//
        // Images.downvoteById
        // Users.removeFromLiked

        Images.downvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

        Users.removeFromLiked(image._id, $sessionStorage.currentUser._id);
        image.upvoteClass = null;
      }
      else if(!image.upvoteClass && image.downvoteClass) {//
        // Images.upvoteById
        // Users.removeFromDisliked

        Images.upvoteById(image._id)
        .then(res => {
          $scope.images[imagesIndex].points = res.data.points;
        });

        Users.removeFromDisliked(image._id, $sessionStorage.currentUser._id);
        image.downvoteClass = null;

      }

    }


  };


});
