'use strict';

var app = angular.module('memeApp');

app.controller('mainCtrl', function($scope, $auth, $state, $sessionStorage, Users) {

  if(!$sessionStorage.currentUser && $auth.isAuthenticated()) {
    Users.getUserById($auth.getPayload().userId)
      .then(res => {
        $sessionStorage.currentUser = res.data;
      })
  }

  $scope.$storage = $sessionStorage;

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout()
      .then(() => {
        console.log('youre logged out');
        $sessionStorage.currentUser = null;
        $scope.currentUser = null;
        $state.go('home', {}, {reload: true});
      });
  };


});
