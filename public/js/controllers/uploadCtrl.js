'use strict';

var app = angular.module('memeApp');

app.controller('uploadCtrl', function($scope, $state, $sessionStorage, Upload) {

  $scope.uploadImage = {};
  $scope.addUrl = false;
  $scope.showFooter = false;


  $scope.$storage = $sessionStorage;

  $scope.upload = function() {
    console.log('$scope.file', $scope.file);
    console.log(typeof $scope.file);

    Upload.upload({
      url: '/images',
      data: { newFile: $scope.file, displayTitle: $scope.uploadImage.displayTitle }
    })
    .then(res => {
      $state.go('home');
    })
    .catch(err => {
      console.log('err:', err);
    })

  };

  $scope.submitTitle = function() {
    $scope.uploadImage.displayTitle = $scope.uploadImage.title;
    $scope.showFooter = true;
  };

  $scope.cancelPost = function() {
    $scope.uploadImage = null;
    $scope.file = null;
    $scope.showFooter = false;
    $scope.addUrl = false;
  }

});
