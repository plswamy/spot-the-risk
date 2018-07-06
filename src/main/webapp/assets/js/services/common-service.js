/*global define */
define(['angular', 'services-module','underscore'], function(angular, services) {
	'use strict';

	/* Services Global Ajax calls setup*/
services.factory('Http', ["$http", "$q", "$state", "$log", "ApiEndpoint", function ($http, $q, $state, $log, ApiEndpoint) {
		return {
			// for all GET ajax calls
			getData : function(url) {
				var url = ApiEndpoint.url + "data",
					d = $q.defer();
				$http.get(url).success(function (data, status, headers, config) {
					if(data.statusCode == "500") {
					} else {
						d.resolve(data);
					}
				}).error(function (data, status, headers, config) {
					d.reject(data);
					console.log(status);
				});
				return d.promise;
			},
			// for all POST ajax calls
			postData : function(url, data) {
				var url = ApiEndpoint.url + url,
					d = $q.defer();
				if (typeof data === "undefined" || data.length <= 0) {
					$log.error("Query: missing data.");
					d.reject("Data must be provided");
				} else {
					$http.post(url, data).success(function (data, status, headers, config) {
						if(data.statusCode == "500") {
						} else {
							d.resolve(data);
						}
					}).error(function (data, status, headers, config) {
						d.reject(data);
						console.log(status);
						if(status==401) $state.go('login');
					});
				}
				return d.promise;
			}
		};
	}]);
	return services;
});