/*global define */
define(['angular', 'directives-module','bootstrap'], function(angular, directives) {
	'use strict';

    /* Directives  */
    directives.directive('appVersion', ['version', '$timeout', '$q', '$http', 'UserData', 'ItemData', 'AttributeData', 'DivisionData', 'StoreData', function(version, $timeout, $q, $http, UserData, ItemData, AttributeData, DivisionData, StoreData) {
        return {
            restrict: 'E',
            link: function(scope, elm, attrs) {
                elm.text(version);
            }
        };
    }]);
	
directives.directive("modal",function(){

 var dco={
     restrict:'EA',
     templateUrl: 'views/modal.html',
     transclude:true,
     replace:true,
     scope:true,
     link: function(scope, element, attrs) {
		scope.title = attrs.title;
		scope.$watch(attrs.visible, function(value){
		
				if(value == true)
				//$("#"+attrs.id).modal('show');
                $(element).modal('show');
				else
                    
				$(element).modal('hide');
        });

		$(element).on('shown.bs.modal', function(){
			scope.$apply(function(){
			scope.$parent[attrs.visible] = true;
			});
		});
		$(element).on('hidden.bs.modal', function(){
			scope.$apply(function(){
				scope.$parent[attrs.visible] = false;
			});
		});
      }
 }
 
 return dco;

});

//check for email availability Validation
directives.directive('usernameAvailable', function($timeout, $q, $http, UserData) {
	  return {
		    restrict: 'AE',
		    require: 'ngModel',
		    link: function(scope, elm, attr, model) {
		    	if(!scope.$parent.isEdit) {
				    model.$asyncValidators.usernameExists = function() { 
						var email = model.$viewValue;
						return UserData.emailExist(email).then(function(res){
					    	$timeout(function(){
					        	model.$setValidity('usernameExists', !res.body); 
					        }, 500);
					    }); 
					};		    		
		    	}
		    }
		  } 
		});
	


//check for item name availability Validation
directives.directive('itemnameAvailable', function($timeout, $q, $http, ItemData) {
	  return {
		    restrict: 'AE',
		    require: 'ngModel',
		    link: function(scope, elm, attr, model) {
		    	if(!scope.$parent.isEdit) {
				    model.$asyncValidators.itemnameExists = function() { 
						var itemName = model.$viewValue;
						return ItemData.itemExist(itemName).then(function(res){
					    	$timeout(function(){
					        	model.$setValidity('itemnameExists', !res.body.itemExists); 
					        }, 500);
					    }); 
					};		    		
		    	}
		    }
		  } 
		});


//check for item number availability Validation
directives.directive('itemnumberAvailable', function($timeout, $q, $http, ItemData) {
	  return {
		    restrict: 'AE',
		    require: 'ngModel',
		    link: function(scope, elm, attr, model) {
		    	if(!scope.$parent.isEdit) {
				    model.$asyncValidators.itemNumberExist = function() { 
						var itemNumber = model.$viewValue;
						return ItemData.itemNumberExist(itemNumber).then(function(res){
					    	$timeout(function(){
					        	model.$setValidity('itemnumberExists', !res.body.itemNumberExist); 
					        }, 500);
					    }); 
					};		    		
		    	}
		    }
		  } 
		});


//check for attribute name availability Validation
directives.directive('attributenameAvailable', function($timeout, $q, $http, AttributeData) {
	  return {
		    restrict: 'AE',
		    require: 'ngModel',
		    link: function(scope, elm, attr, model) {
		    	if(!scope.$parent.isEdit) {
				    model.$asyncValidators.attributenameExists = function() { 
						var attributeName = model.$viewValue;
						return AttributeData.attributeExist(attributeName).then(function(res){
					    	$timeout(function(){
					        	model.$setValidity('attributenameExists', !res.body.attributeExists); 
					        }, 500);
					    }); 
					};		    		
		    	}
		    }
		  }; 
		});


//check for division name availability Validation
directives.directive('divisionnameAvailable', function($timeout, $q, $http, DivisionData) {
	  return {
		    restrict: 'AE',
		    require: 'ngModel',
		    link: function(scope, elm, attr, model) {
		    	if(!scope.$parent.isEdit) {
				    model.$asyncValidators.divisionnameExists = function() { 
						var divisionName = model.$viewValue;
						return DivisionData.divisionExist(divisionName).then(function(res){
					    	$timeout(function(){
					        	model.$setValidity('divisionnameExists', !res.body.divisionExists); 
					        }, 500);
					    }); 
					};		    		
		    	}
		    }
		  }; 
		});

//check for store no. availability Validation
directives.directive('storenumberAvailable', function($timeout, $q, $http, StoreData) {
	  return {
		    restrict: 'A',
		    require: 'ngModel',
		    link: function(scope, elm, attr, model) {

		    	if(!scope.isEdit) {
				    model.$asyncValidators.storenumberExists = function() { 
						var storeNo = model.$viewValue;
						return StoreData.storenumberExist(storeNo).then(function(res){
					    	$timeout(function(){
					        	model.$setValidity('storenumberExists', !res.body.storeExists); 
					        }, 500);
					    }); 
					};		    		
		    	}
		    }
		  }; 
		});


directives.directive('checkfileSize',function(){
    return {
    	restrict: 'A',
	    require: '?ngModel',
        link: function(scope, elem, attr, ngModel) {
        	elem.bind('change', function () {
        		var fileSize = parseInt(this.files[0].size/1000, 10).toFixed(0);
        		if(fileSize > 200) {
        			ngModel.$setValidity('filesizeerror', false);
        		} else {
        			ngModel.$setValidity('filesizeerror', true);
        		} 
            });
        }
    };
});
		
// Messages show/hide with animation below the header
directives.directive("bnSlideShow", function() {
	// I allow an instance of the directive to be hooked
	// into the user-interaction model outside of the
	// AngularJS context.
	function link( $scope, element, attributes ) {
		// I am the TRUTHY expression to watch.
		var expression = attributes.bnSlideShow;
		// I am the optional slide duration.
		var duration = ( attributes.slideShowDuration || "fast" );
		// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			element.hide();
		}
		// I watch the expression in $scope context to
		// see when it changes - and adjust the visibility
		// of the element accordingly.
		$scope.$watch(
			expression,
			function( newValue, oldValue ) {
				// Ignore first-run values since we've
				// already defaulted the element state.
				if ( newValue === oldValue ) {
					return;
				}
				// Show element.
				if ( newValue ) {
					element
						.stop( true, true )
						.slideDown( duration )
					;
				// Hide element.
				} else {
					element
						.stop( true, true )
						.slideUp( duration )
					;
				}
			}
		);
	}
	// Return the directive configuration.
	return({
		link: link,
		restrict: "A"
	});
});
	
	return directives;
});