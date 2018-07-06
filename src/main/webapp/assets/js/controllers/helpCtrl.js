'use strict';
/** 
  * controller for Login
*/
define(['angular',
        'controllers-module',
		'underscore'
        ], function(angular, controllers, underscore) {  
controllers.controller("HelpCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
	$scope.showHelp = false;
	$scope.toggleHelp = function() {
		$scope.showHelp = $scope.showHelp == true ? false : true;
	};
	
}]);
});