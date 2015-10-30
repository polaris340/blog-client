/// <reference path="../typings/angularjs/angular.d.ts" />

module Blog {
  angular.module("blogApp", ['ionic'])
    .constant('URL', {
      BASE: '-',
      API: '-/api'
    })
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('posts', {
          url: '/',
          controller: 'PostListController',
          templateUrl: 'templates/posts/post-list.html'
        });
      $urlRouterProvider.otherwise('/');

    });

  export var getModule:() => ng.IModule = () => {
    return angular.module('blogApp');
  }
}
