'use strict';

var app = angular.module('memeApp', ['ui.router', 'ngStorage', 'satellizer', 'ngMaterial', 'ngMessages', 'ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html',
      controller: 'homeCtrl',
      resolve: {
        images: function(Images) {
          return Images.getAllImages()
            .then(res => {
              return res.data;
            })
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('upload', {
      url: '/upload',
      templateUrl: '/html/upload.html',
      controller: 'uploadCtrl'
    })

    $urlRouterProvider.otherwise('/');
});
