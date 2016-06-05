'use strict';

var app = angular.module('memeApp');

app.controller('commentsCtrl', function($scope, $state, $stateParams){
  console.log('commentsCtrl');
  console.log('image', $stateParams.image);
});
