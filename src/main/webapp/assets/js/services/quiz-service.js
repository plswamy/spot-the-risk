/*global define */
define(['angular', 'services-module','underscore'], function(angular, services) {
	'use strict';
	
	/* Services */
services.factory("quizData",["Http","$q",function(Http,$q){
		return	{
			get:function(){
				var deferred = $q.defer();
				Http.getData('').then(function(data){
					deferred.resolve(data);
				}).catch(function(err){});
				return deferred.promise;
			}
		};
	}]);
    
	return services;
});