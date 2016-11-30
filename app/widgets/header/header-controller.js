(function(){ 
  "use strict";
   EduPlanner.controller('HeaderController', ['$scope','$rootScope',"$location",
    "$document", function ($scope,$rootScope,$location, $document) {
      $rootScope.hideLayout = false;
      
      $scope.$location = $location;

      $scope.educationTargetClick = function(){
      	  $location.path("/educationTarget");
      };
      
      $scope.actNowClick = function(){
         $location.path("/actNow");
      };
      $scope.sourcesofFundsClick = function(){
         $location.path("/sourcesofFunds");
      };
      $scope.editClick = function(){
         $location.path("/edit");
      };
}]);

 }());
