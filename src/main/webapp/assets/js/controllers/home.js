'use strict';
/** 
  * controller for user profile
*/
define(['angular',
        'controllers-module',
		'underscore'
        ], function(angular, controllers, underscore) {  
controllers.controller("homeCtrl", ["$scope", "$rootScope", "$state", function($scope, $rootScope, $state) {

	if($rootScope.data) {
		setData();
	}
	$scope.$watch(function() {
	  return $rootScope.data;
	}, function() {
		if($rootScope.toState && $rootScope.toState.name) {
			setData();
		}
	});

	function setData() {
			var data = _.pluck($rootScope.data.nav, $rootScope.toState.name);
			data = _.without(data, undefined)[0];
			if(data != null){
			$scope.leaderBoardData = data;
			$rootScope.title = data.title;
			}
	};

    $scope.goToAboutUs = function() {
        $state.go('about-us');
    };

    $scope.goToApp = function() {
        $state.go('app');
    };

    $scope.goToQuiz = function() {
        $state.go('quiz');
    };

    $scope.goToWinners = function() {
        $state.go('winners');
    };
    
    $scope.goToTerms = function() {
        $state.go('official-terms');
    };

}]);
});