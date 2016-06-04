'use strict';

var app = angular.module('memeApp');

app.controller('registerCtrl', function($scope, $auth, $timeout) {
  console.log('registerCtrl');

  $scope.dismissAlert = () => {
    $scope.showAlert = false;
    $scope.newUser.password = '';
    $scope.newUser.password2 = '';
  };

  $scope.register = () => {

    if($scope.newUser.password !== $scope.newUser.password2) {
      $scope.error = "Password mismatch"
      $scope.showAlert = true;
      $timeout($scope.dismissAlert, 2000);
    } else {

      var newUser = {
        email: $scope.newUser.email,
        displayName: $scope.newUser.displayName,
        password: $scope.newUser.password,
      }

      $auth.signup(newUser)
        .then(res => {
          $scope.showSuccess = true;
        })
        .catch(err => {
          $scope.error = err.data.message;
          $scope.showAlert = true;
          $timeout($scope.dismissAlert, 2000);
        });
    }
  };
});
