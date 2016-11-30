(function(){ 
  "use strict";

  var EducationTargetController = function ($scope, $rootScope,$location,commonService) {
  	 $rootScope.hideLayout = true;
  	 $scope.$location = $location;
     $scope.model = $rootScope.model;
     $scope.country = $scope.model.country;
     $scope.isFemale = false;
     if($scope.country == 'SG'){
     $scope.isSingapore  = true;
     $scope.isAustralia = false;
     $scope.isUnitedStates = false;
     $scope.isUnitedKingdom = false;
   }
   if ($scope.model.gender == "Male"){
        $scope.isMale = true;
       }
   else{
    $scope.isFemale = true;
    $scope.model.gender = "Female";
   }
    
     $scope.setCountry=function(selectedCountry){
        $scope.country=selectedCountry;         
        if(selectedCountry == "SG")
        {               
          $scope.isSingapore = true, $scope.isAustralia = false, $scope.isUnitedStates = false,$scope.isUnitedKingdom = false;
         // console.log('Singapore');
        }
        else if(selectedCountry == "AU")
        {               
          $scope.isSingapore = false,$scope.isAustralia = true,$scope.isUnitedStates = false,$scope.isUnitedKingdom = false;
          //console.log('Australia');
        }
        else if(selectedCountry == "US")
        {               
          $scope.isSingapore = false,$scope.isAustralia = false,$scope.isUnitedStates = true,$scope.isUnitedKingdom = false;
         // console.log('United States');
        }
        else if(selectedCountry == "UK")
        {                      
          $scope.isSingapore = false,$scope.isAustralia = false, $scope.isUnitedStates = false,$scope.isUnitedKingdom = true;
          //console.log('United Kingdom');
        } 
        else{
        	return false;
        }
        $scope.model.country = $scope.country;
        //console.log('country' + $cookieStore.put('model.country'));
      };

      $scope.countryUpdate = function(){
       $scope.model.country = $scope.country;
       $rootScope.model.country = $scope.country;
        //$location.path('/sourceofFunds');
        $rootScope.next('sourceofFunds');
      }
        $rootScope.model = $scope.model;
       function init(){
        $scope.setCountry($scope.model.country);
       }
       init();
   };

   EducationTargetController.$inject = ['$scope','$rootScope','$location','commonService'];
   EduPlanner.controller("EducationTargetController", EducationTargetController);


 }());
