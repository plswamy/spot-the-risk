'use strict';
/**
 * controller for user profile
 */
define(['angular',
    'controllers-module',
    'underscore'
], function(angular, controllers, underscore) {
    controllers.controller("quizCtrl", ["$scope", "$rootScope", "$timeout", "$window", function($scope, $rootScope, $timeout, $window) {
    	
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
    			$scope.quizPageData = data;
    			$rootScope.title = data.pageTitle;
    			$scope.q_data=$scope.data.quiz;
    			$scope.countries=$scope.data.countries;
    			}
    			//console.log(qdata);
    	};
    	
        $scope.tryAgain = function() {
            $window.location.reload();
        };
        $timeout(function() {
            $scope.qdata = $scope.data.quiz;

            var e = {
                serviceURL: "/ajax/",
                quiz_data: $scope.data.quiz
            };
            var t = $("body").quiz(e).data("quiz");
            $("#quiz-landing p.rsABlock-title").css({
                cursor: "pointer"
            });
            $("#play-btn, #quiz-landing p.rsABlock-title").on("click", function (e) {
                t.options.rsQuestions.next();
                //return false
            })
        }, 50);
    }]);
});