'use strict';

var app = angular.module('memeApp');

app.controller('mainCtrl', function($scope, $auth, $state, $sessionStorage) {

  $scope.$storage = $sessionStorage;

  console.log('$scope.$storage', $scope.$storage);

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout()
      .then(() => {
        console.log('youre logged out');
        $sessionStorage.currentUser = null;
        $state.go('home');
      });
  };


});
