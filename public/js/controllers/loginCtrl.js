'use strict';

var app = angular.module('memeApp');

app.controller('loginCtrl', function($scope, $auth, $sessionStorage, $http, $state, $stateParams, Users, $timeout) {

  $scope.loginUser = {};

  $scope.dismissAlert = () => {
    $scope.showAlert = false;
    $scope.loginUser = null;
  };

  $scope.login = function() {

    $auth.login($scope.loginUser)
      .then(res => {
        var email = res.config.data.email;
        Users.getCurrentUser(email)
          .then(res => {
            $sessionStorage.currentUser = res.data;

            $state.go('home');
          })
        })
        .catch(err => {
          $timeout(function() {
            $scope.error = err.data.message;
            $scope.showAlert = true;
          }, 1000);
          $timeout($scope.dismissAlert, 4000);
        });


  };

  $scope.authenticate = function(provider) {
    console.log('authenticate');
      $auth.authenticate(provider)
        .then(res => {
          console.log('res after authenticate', res);
          var email = res.data.profile.email;
          Users.getCurrentUser(email)
            .then(res => {
              $sessionStorage.currentUser = res.data;
              $state.go('profile');
            });
        })
        .catch(err => {
          console.log('error for authenticate', err);
        });
    };




});
