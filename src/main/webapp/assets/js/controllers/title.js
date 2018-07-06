

/** 
  * controller for title
*/
define(['angular',
        'controllers-module',
		'underscore'
        ], function(angular, controllers, underscore) {  
controllers.controller("test1", ["$scope", "$rootScope", "$state", function($scope, $rootScope, $state) {
	$scope.title = "";
	$scope.$watch(function() {
	  return $rootScope.title;
	}, function() {
		$scope.title = $rootScope.title;
	});



}]);
});