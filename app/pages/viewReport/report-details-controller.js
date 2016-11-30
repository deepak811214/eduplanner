(function(){ 
  //"use strict";
   var ReportDetailsController = function ($scope, $rootScope,$location,limitToFilter,commonService) {
   	 $rootScope.hideLayout = true;
   	 $scope.$location = $location;
   	 $scope.model = $rootScope.model;
  
   };

   ReportDetailsController.$inject = ['$scope','$rootScope','$location','limitToFilter','commonService'];
   EduPlanner.controller("ReportDetailsController", ReportDetailsController);
 
 }());
