require(['config'], function(config) {
    require(['angular', 'app'], function(angular, app){
    	//start angular application here
        angular.bootstrap(document, [ app.name ]);
    });
});
