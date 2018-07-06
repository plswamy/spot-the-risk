
'use strict';

define(['angular',
        'controllers-module',
		'underscore'
        ], function(angular, controllers, underscore) {  
	
	// Controller definition
controllers.controller("ItemCtrl", ["$scope", "$rootScope", "$state", "ItemData", "$filter", 'uiGridConstants', function($scope, $rootScope, $state, ItemData, $filter, uiGridConstants) {
       //current using $scope later change controler as syntax approach....
		$scope.userType = $rootScope.userInfo.userType;
        $scope.gridOptions = {
    		type: "Item Setup",
    		searchText: "",
    		createType: "Create Item",
            enableColumnMenu: false,
            rowHeight: 40,
            paginationPageSizes: [10, 50, 100],
            paginationPageSize: 10,
            enableFiltering: true,
            columnDefs: [
                { field:"itemNumber", name: 'Item No', enableColumnMenu: false,
                	sort: {
    	                direction: uiGridConstants.DESC,
    	                priority: 1
    	              }
                },
                { field:"skuName", name: 'Item Name', enableColumnMenu: false},
                { field:"itemType", name: 'Item Type', enableColumnMenu: false },
                { field:"inks", name: 'Inks', enableColumnMenu: false },
                { field:"bannerVersioning", name: 'Banner versioning', enableColumnMenu: false },
                { field:"fundingSource", name: 'Funding Source', enableColumnMenu: false },
                { field:"overs", name: 'Overs', enableColumnMenu: false },
                { field:"componentCode", name: 'Component Code', enableColumnMenu: false },
                { field:"totalItemCost", name: 'Total Cost', enableColumnMenu: false,
                	cellTemplate: '<div class="ui-grid-cell-contents wlt-cost-field wlt-cost-grid"><input type="text" class="wlt-promo-total" ng-readonly="true" ng-trim=false awnum="wlt" ng-model="row.entity.totalItemCost" value="{{row.entity.totalItemCost}}"></input></div>'
               	},
                { name: 'Action', 
                  enableColumnMenu: false,
                  enableFiltering: false,
                  enableSorting: false,
                  cellEditableCondition: false,
                  cellTemplate: '<a class="wlt-actioncontainer" href="javascript:void(0)"><span class="wlt-edit" ng-click="grid.appScope.editRow(row)"></span></a> <a ng-if="grid.appScope.isItemArchived(row)" class="wlt-actioncontainer" href="javascript:void(0)" title="Archive"><span class="wlt-archive fa fa-archive" confirm="Are you sure, you want to archive this item?" confirm-ok="Yes" confirm-cancel="No" ng-click="grid.appScope.archiveItem(row)"></span></a> <a ng-if="grid.appScope.isItemUnArchived(row)" class="wlt-actioncontainer" href="javascript:void(0)" title="Unarchive"><span class="wlt-unarchive fa fa-check-circle-o" ng-click="grid.appScope.unarchiveItem(row)"></span></a>' 
                }
            ],
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        
      
        $scope.isItemArchived = function(row) {
    		return !row.entity.archive;
    	};
    	
    	$scope.isItemUnArchived = function(row) {
    		return row.entity.archive;
    	};
    	
    	$scope.archiveItem = function(row) {
    		ItemData.itemArchive(row.entity.id, true).then(function(data){
        		console.log("sucessfully archived...");
                var index = $scope.gridOptions.data.indexOf(row.entity);
               	$scope.gridOptions.data[index].archive = true;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            },function(){});
        };
        
        $scope.unarchiveItem = function(row) {
        	ItemData.itemArchive(row.entity.id, false).then(function(data){
        		console.log("sucessfully unarchived...");
                var index = $scope.gridOptions.data.indexOf(row.entity);
                $scope.gridOptions.data[index].archive = false;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        	},function(){});
        };
        
        ItemData.get().then(function(data){
            $scope.gridOptions.data = data.body.wltItems;
            $scope.gridOptions.tempData = data.body.wltItems;
            
            var tempData = [];
            for(var i = 0; i < $scope.gridOptions.tempData.length; i++) {
              tempData.push(_.pickDeep($scope.gridOptions.tempData[i], 'itemNumber', 'skuName', 'itemType', 'inks', 'bannerVersioning', 'fundingSource', 'overs', 'totalItemCost', 'id'));
            }
            $scope.gridOptions.tempData = tempData;
            
        },function(){});
        
        // Create new item
		$scope.create = function(){
			$state.go("item/add");
		};
        
		$scope.exportItems = function() {
			ItemData.downloadFile();
		};
		
		$scope.importItems = function() {
        	$state.go("item/import");
        };
		
		// edit item
        $scope.editRow = function(row) {
			$state.go("item/edit",{"id":row.entity.id});
            console.log(row);
        };
        
        $scope.deleteRow = function(row) {
        	console.log("delete row...");
        };
        
        $scope.filterData = function() {
            console.log($scope.gridOptions.searchText);
            $scope.gridOptions.data = $filter('filter')($scope.gridOptions.tempData, $scope.gridOptions.searchText, undefined);
        };
   
	}]);
});