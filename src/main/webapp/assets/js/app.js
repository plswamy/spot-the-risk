define([
    'require',
    'jquery',
    'angular',
    'angular-resource',
	'ngStorage',
    'directives/main',
    'services/main',
    'controllers/main',
    'routes'
    
], function (require, $, angular, ngResource, ngStorage, directives,services, controllers, routes) {
    'use strict';    
    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var custApp = angular.module('custApp', [
            'ngResource',
            'app.controllers', 
            'app.directives', 
            'app.services', 
            'app.routes',
			'ngStorage'
        ])

    
		// api services url constant variable
		custApp.constant('ApiEndpoint', {
  		    url: ''
		});
	
	/* Creted new instead of this default
	custApp.run(['$location', '$rootScope' ,function($location, $rootScope){
    }]); */
	custApp.run(['$rootScope', '$state', '$stateParams', '$location', 'leaderBoardData',
		function($rootScope, $state, $stateParams, $location, leaderBoardData) {
		$rootScope.data = false;
		$rootScope.title = "";
		leaderBoardData.get().then(function(data) {
			$rootScope.data = data.data;
		});
		
		  // it'll be done when the state it resolved.
		  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
			  $rootScope.dataLoading = true;
			// track the state the user wants to go to; authorization service needs this
				$rootScope.toState = toState;
				$rootScope.toStateParams = toStateParams;
		  });
		  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			//stop loading bar on stateChangeSuccess
			event.targetScope.$watch("$viewContentLoaded", function() {
				$rootScope.dataLoading = false;
			});
		  });
		}
	  ]);
    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    custApp.controller('MainCtrl',['$scope', '$rootScope', '$location', "$localStorage", "$sessionStorage", function($scope, $rootScope, $location, $localStorage, $sessionStorage){
       //$scope.defaulText="";
        //Unbind all widgets from datasources and widgets when page changes
		//alert("fdsfd");
        $rootScope.$on('$routeChangeStart', function() {
        });

                 
    }]);
    
    window.custApp = custApp;
	
    //Return the application  object
    return custApp;
});