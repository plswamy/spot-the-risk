'use strict';
/** 
  * controller for user profile
*/
define(['angular',
        'controllers-module',
		'underscore'
        ], function(angular, controllers, underscore) {  
controllers.controller("aboutUsCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {

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
			$scope.aboutUsData = data;
			$rootScope.title = data.pageTitle;
			}
	};

}]);
});