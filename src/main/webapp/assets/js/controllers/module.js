
/*
 * Define Angular controllers module
 */
define(['angular'], function (angular) {

    var module =  angular.module('app.controllers', []);

    module.config(['$controllerProvider',function($controllerProvider){

        module._controller = module.controller;
	
        module.controller = function(name, constructor) {
            $controllerProvider.register(name, constructor);
        };
	
    }]);

    return module;	
});