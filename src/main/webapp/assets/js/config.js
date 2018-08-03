/* global requirejs, define */

'use strict';
/**
 * This file sets up the basic module libraries you'll need
 * for your application.
 */
requirejs.onError = function(err) {
    //console.log(err.requireType);
    if (err.requireType === 'timeout') {
        //console.error('modules: ' + err.requireModules);
    }
    throw err;
};
/**
 * RequireJS Config
 * This is configuration for the entire application.
 */
require.config({
    enforceDefine : false,
    xhtml : false,    
	//Cache buster
    //urlArgs : '_=' + Date.now(),
    waitSeconds : 15,
    config : {
        text : {
            env : 'xhr'
        }
    },
    paths : {
        
       directives : './directives',
        // Named References
        config: './config',
        app: './app',

        //Angular App Modules
        'controllers-module': 'controllers/module',
        'directives-module': 'directives/module',
        'services-module': 'services/module',

        // angularjs + modules
         angular: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.1/angular.min',
        'angular-resource': 'https://cdnjs.cloudflare.com/ajax/libs/angular-resource/1.3.0/angular-resource',
        'angular-ui-router': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min',
		'ngStorage': 'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.0/ngStorage.min',
		underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min',
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery',
		bootstrap: 'https://stackpath.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min'/*,
		angularGird: 'bower_components/ui-grid/ui-grid',
		'isteven-multi-select': 'bower_components/angularmultiselect/isteven-multi-select',
		angularUi: 'bower_components/angular-ui-bootstrap/ui-bootstrap',
		angularUitpls: 'bower_components/angular-ui-bootstrap/ui-bootstrap-tpls',
		angularConfirm: 'bower_components/angular-ui-confirm/angular-confirm',
		csv: 'bower_components/csv/csv',
		angularMatch: 'bower_components/angular-validation-match/angular-validation-match',
		angularUiMask: 'bower_components/ui-mask/ui-mask',
		deeppick: 'bower_components/deeppick/deeppick',
		numberDirective: 'bower_components/numberDirective/numberDirective'*/
    },
   
    
    priority: [
        'jquery',
        'angular',
        'angular-resource',
        'angular-ui-router',
		'ngStorage',
        'bootstrap'
    ],    
    shim : {
		'angular' : {
			deps: ['jquery'],
			exports : 'angular'
		},
		'angular-route': ['angular'],
		'angular-resource': ['angular'],
		'angular-ui-router': ['angular'],
		'ngStorage': ['angular'],
		'angularGird':['angular'],
        'bootstrap': ['jquery'],
        underscore : {
            exports : '_'
        },
       'deeppick': ['underscore'],
		bootstrapper: {
			deps: [
				'app',
				'directives-module',
				'services-module',
				'controllers-module',
				'routes'
			]
		}
    }
});
