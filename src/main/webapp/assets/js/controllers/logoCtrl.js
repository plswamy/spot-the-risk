'use strict';
/**
 * controller for user profile
 */
define(['angular',
  'controllers-module',
  'underscore'
], function(angular, controllers, underscore) {
  controllers.controller("logoCtrl", ["$scope", "$rootScope", "$state", function($scope, $rootScope, $state) {


    $scope.goToHome = function() {
      //console.log(" 111111111111  ------------------- ");
      $state.go('home');
    };

    $scope.toggleNavBar = function() {
      $("#sos-header-bottom").toggleClass('sos-display-mobile-menu');
      //console.log(" 222222222222 ------------------- ");
    };

  }]);
});