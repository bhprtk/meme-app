'use strict';

var app = angular.module('memeApp');

app.controller('uploadCtrl', function($scope, $state, $sessionStorage, Upload, Users) {

  $scope.uploadImage = {};
  $scope.addUrl = false;
  $scope.showFooter = false;
  $scope.loading = false;


  $scope.$storage = $sessionStorage;

  $scope.upload = function() {
    $scope.loading = true;
    Upload.upload({
      url: '/images',
      data: { newFile: $scope.file, displayTitle: $scope.uploadImage.displayTitle }
    })
    .then(res => {
      Users.addUploadedImage(res.data._id, $sessionStorage.currentUser._id)
        .then(res => {
          $sessionStorage.currentUser = res.data;
          $scope.loading = false;
          $state.go('home');

        });
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
