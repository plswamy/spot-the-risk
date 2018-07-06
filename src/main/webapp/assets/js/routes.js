
/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define([ 'angular', 'controllers/main', 'angular-ui-router' ], function (angular, controllers) {
    
    'use strict';
    
    return angular.module('app.routes', [ 'ui.router' ]).config([ "$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(false);
          /**
           * Router paths
           * This is where the name of the route is matched to the controller and view template.
		    current no abstarct route is set...
           */
      $stateProvider
           .state('home', {
            url:'/home',
				name: 'home',
            templateUrl: 'assets/views/home.html',
            controller: 'homeCtrl'
           })
           .state('app', {
            url: '/app',
				name: 'app',
            templateUrl: 'assets/views/app.html',
            controller: 'appCtrl'
           })
           .state('about-us', {
            url:'/about-us',
				name: 'about-us',
            templateUrl: 'assets/views/about-us.html',
            controller: 'aboutUsCtrl'
           })
           .state('leaderboard', {
            url:'/leaderboard',
				name: 'leaderboard',
            templateUrl: 'assets/views/leaderboard.html',
            controller: 'leaderBoardCtrl'
           })
          .state('quiz', {
            url:'/quiz',
				name: 'quiz',
            templateUrl: 'assets/views/quiz.html',
            controller: 'quizCtrl'
          })
          .state('winners', {
              url:'/winners',
              templateUrl: 'assets/views/winners.html',
              controller: 'winnersCtrl'
          })
          .state('official-terms', {
            url:'/official-terms',
				name: 'official-terms',
            templateUrl: 'assets/views/official-terms.html',
            controller: 'termsCtrl'
           });
          
        $urlRouterProvider.otherwise('home');
    } ]);
});
