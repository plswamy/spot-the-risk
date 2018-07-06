

'use strict';

define(['angular',
        'controllers-module',
		'underscore'
        ], function(angular, controllers,underscore) {  
	
	// Controller definition
controllers.controller("DashboardCtrl", ["$scope", "$rootScope", "DashboardData", "$filter", 'uiGridConstants', '$state', function($scope, $rootScope, DashboardData, $filter, uiGridConstants, $state) {
       //current using $scope later change controler as syntax approach....   
	$scope.userType = $rootScope.userInfo.userType;
	$scope.userEmail = $rootScope.userInfo.emailid;
    $scope.gridOptions = {
        type: "Kits/Orders Summary",
        createType: "Create Promo",
        searchText: '',
        enableColumnMenu: false,
        rowHeight: 40,
        paginationPageSizes: [10, 50, 100],
        paginationPageSize: 10,
        enableFiltering: true,
        columnDefs: [{ field:"wltPromoDTO.periodWeekStart", name: 'Period Week Start', enableColumnMenu: false,
	        	sort: {
	                direction: uiGridConstants.DESC,
	                priority: 1
	              }
	        },
            { field:"wltPromoDTO.promoName", name: 'Promo Name', enableColumnMenu: false,
                cellTemplate: '<a class="wlt-promo-name" href="javascript:void(0)"><span ng-click="grid.appScope.editRow(row)">{{row.entity.wltPromoDTO.promoName}}</span></a>'
	        },
            { field:"wltStoreDTO.storeNumber", name: 'Store No', enableColumnMenu: false },
            { field:"wltPromoDTO.validToDate", name: 'Promo End Date', enableColumnMenu: false },
            /*{ field:"wltStoreDTO.facilityTypeDesc", name: 'Facility', enableColumnMenu: false },*/
            { field:"status", name: 'Status', enableColumnMenu: false,
                cellClass: function(grid, row, cell) {
                    return grid.getCellValue(row,cell) == "APPROVED" ? 'wlt-approved' : 'wlt-pending';
                },
                cellTemplate: '<span></span>'
            },
            { name: 'Action',
               enableColumnMenu: false,
               enableFiltering: false,
               enableSorting: false,
               cellEditableCondition: false,
               cellTemplate: '<a class="wlt-actioncontainer" href="javascript:void(0)"><span class="wlt-edit" ng-click="grid.appScope.editRow(row)"></span></a> <a ng-if="grid.appScope.returnUserType(row)" class="wlt-actioncontainer" href="javascript:void(0)"><span class="wlt-delete" confirm="Are you sure, you want to delete this promo?" confirm-ok="Yes" confirm-cancel="No" ng-click="grid.appScope.deleteRow(row)"></span></a>' 
             }]
    };
    
    DashboardData.get($scope.userEmail).then(function(data){
		$scope.gridOptions.data = data.body.wltOrders;
        $scope.gridOptions.tempData = data.body.wltOrders;
        
        var tempData = [];
        for(var i = 0; i < $scope.gridOptions.tempData.length; i++) {
          tempData.push(_.pickDeep($scope.gridOptions.tempData[i], 'wltPromoDTO.periodWeekStart', 'wltPromoDTO.promoName', 'wltStoreDTO.storeNumber', 'wltPromoDTO.validToDate', 'wltStoreDTO.facilityTypeDesc', 'status', 'id'));
        }
        $scope.gridOptions.tempData = tempData;
        
	},function(){});
    
	$scope.returnUserType = function(row) {
		return ($scope.userType == 1 && row.entity.status == 'PENDING');
	};
	
	// Edit Store
    $scope.editRow = function(row) {
		$state.go("kitOrderScreen",{"id":row.entity.id});
        //console.log(row);
    };
    
    $scope.exportKitOrder = function() {
    	DashboardData.downloadFile($scope.userEmail);
    };
    
    $scope.deleteRow = function(row) {
    	DashboardData.deletePromo(row.entity.id).then(function(data){
    		console.log("sucessfully deleted...");
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
    	},function(){});
    };
    
    $scope.filterData = function() {
        console.log($scope.gridOptions.searchText);
        $scope.gridOptions.data = $filter('filter')($scope.gridOptions.tempData, $scope.gridOptions.searchText, undefined);
    };
   
	}]);
});