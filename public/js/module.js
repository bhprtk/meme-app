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
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl'
    })
    .state('profile.home', {
      url: '/profile.home',
      templateUrl: '/html/home.html',
      controller: 'homeCtrl',
      resolve: {
        images: function(Users, $sessionStorage) {
           return Users.getLikedPosts($sessionStorage.currentUser._id)
            .then(res => {
              console.log('res after getLikedPosts', res.data);
              return res.data.liked;
            })
        }
      }
    })

    $urlRouterProvider.otherwise('/');
});
