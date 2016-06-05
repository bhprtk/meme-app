'use strict';

var app = angular.module('memeApp', ['ui.router', 'ngStorage', 'satellizer', 'ngMaterial', 'ngMessages', 'ngFileUpload']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.facebook({
    clientId: '1409891765703679' // get facebook id
  });

  $authProvider.github({
      clientId: 'b23dc036d1d3a37ae736'
    });



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
    .state('settings', {
      url: '/settings',
      templateUrl: '/html/settings.html',
      controller: 'settingsCtrl'
    })
    .state('profile.home', {
      url: '/profile.home/:get',
      templateUrl: '/html/home.html',
      controller: 'homeCtrl',
      resolve: {
        images: function(Users, $sessionStorage, $stateParams) {


          if($stateParams.get === 'liked') {
            return Users.getLikedPosts($sessionStorage.currentUser._id)
              .then(res => {
                return res.data.liked;
              })
          } else if($stateParams.get === 'uploaded') {
            return Users.getUploadedPosts($sessionStorage.currentUser._id)
              .then(res => {
                  var postedImages = res.data.posted;
                  postedImages.isUploaded = true;

                return postedImages;
              })
          }

        }
      }
    })

    $urlRouterProvider.otherwise('/');
});
