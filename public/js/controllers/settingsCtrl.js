'use strict';

var app = angular.module('memeApp');

app.controller('settingsCtrl', function($scope, $state, $sessionStorage, Users, $mdToast, Upload) {


  $scope.upload = function() {
    Upload.upload({
      url:'/users/profilePic',
      data: { newFile: $scope.file, userId: $sessionStorage.currentUser._id }
    })
    .then(res => {
      $sessionStorage.currentUser = res.data;
      $state.go('profile');
    })
    .catch(err => {
      console.log('err after upload profile pic', err);
    })
  };


  $scope.updateName = function() {
    Users.saveNewName($sessionStorage.currentUser._id, $scope.newName)
      .then(res => {
        $sessionStorage.currentUser = res.data;
        $scope.newName = null;
        $mdToast.show({
          hideDelay   : 3000,
          position    : 'bottom',
          template :
          `<md-toast>
          <span class="md-toast-text" flex>Your display name has been saved successfully</span>
          </md-toast>`
        });
      })
      .catch(err => {
        console.log('err after saveNewName', err);
      })
  };



});
