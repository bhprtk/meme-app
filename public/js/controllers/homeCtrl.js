'use strict';

var app = angular.module('memeApp');

app.controller('homeCtrl', function($scope, images, Images) {

  console.log('images in homeCtrl', images[0].url);

  $scope.points = 0;
  $scope.images = images.reverse();
  var upvoted = false;
  var downvoted = false;

  $scope.upvote = function(image) {

    Images.upvoteById(image._id)
      .then(res => {
        image.points = res.data.points;
      })
      .catch(err => {
        console.log('error after upvote', err);
      })
    // if(!upvoted) {
    //   // $scope.points++;
    //   // upvoted = true;
    //   // downvoted = false;
    //   // var upvote = angular.element( document.querySelector( '.upvote' ) );
    //   // upvote.removeClass('btn-default');
    //   // upvote.addClass('btn-success');
    // }

  };

  $scope.downvote = function(image) {

    Images.downvoteById(image._id)
      .then(res => {
        image.points = res.data.points;
      })
      .catch(err => {
        console.log('error after downvote', err);
      })
    // if(!downvoted) {
    //   $scope.points--;
    //   downvoted = true;
    //   upvoted = false;
    // }

  };


});
