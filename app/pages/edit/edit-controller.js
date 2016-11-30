(function(){ 
  "use strict";

 var EditController = function ($scope, $rootScope,$location,commonService, $window) {
 	 $rootScope.hideLayout = true;
 	 $scope.$location = $location;
 	 $scope.model = $rootScope.model;
   var obj = $rootScope.model;
   //$scope.model.gender = $rootScope.model.gender;
   $scope.gender = $scope.model.gender;
 	 $scope.country = $scope.model.country;
 	 $scope.isMale = true;
   $scope.isSingapore  = true;
   $scope.isCountrySelected = false;
   $scope.submitted = false;
   $scope.isCountrySelected = false;
   $scope.isGenderChanged = false;
   var newModel = angular.copy($scope.model);
   var countrySelected = angular.copy($scope.model.country);
   var genderSelected = angular.copy($scope.model.gender);
   
    if($scope.gender!='Male') 
      {
        $scope.isMale=false; 
        $scope.max = 19;
      }
      else
      {
        $scope.max = 21;
      }
      $scope.disabledButton = function(){
        if ($scope.editForm.$dirty === true || $scope.isCountrySelected === true || $scope.isGenderChanged === true) {
              return false;
        }
        else{
          return true;
        }
      }

      //Child age min and max validation
       $scope.childAgeValidation = function(){
        if ($scope.isMale) {
          if ($scope.model.childAge > 20 || $scope.model.childAge < 1) {
            $scope.ageError = true;
            return false
          }else
          {
            $scope.ageError = false;
            return true
          }
        }
        else
        {
          if ($scope.model.childAge > 18 || $scope.model.childAge < 1) {
            $scope.ageError = true;
            return false
          }else
          {
            $scope.ageError = false;
            return true
          }
        }
      };

      //--set gender selection from view.
      $scope.setGender=function(selectedGender){
        $scope.gender=selectedGender;         
        if(selectedGender=="Male"){               
          $scope.isMale=true;
          $scope.model.gender ="Male";
        }
        else{                     
          $scope.isMale=false;
           $scope.model.gender ="Female";
         // console.log('female');
        } 
          if ($scope.model.gender !== genderSelected){
             $scope.isGenderChanged = true;
           }
           $scope.childAgeValidation();
      };
      
       if ($scope.country == 'SG'){
       $scope.isSingapore  = true, $scope.isAustralia = false,$scope.isUnitedStates = false,$scope.isUnitedKingdom = false;
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
           if(selectedCountry !== countrySelected){
           $scope.isCountrySelected  = true;
           }
        $scope.model.country = $scope.country;
      };
      
      $scope.backReport = function(){
        $rootScope.model = newModel;
        $rootScope.back('report');
      } 
       $scope.updateReport = function($event, model){
        $event.preventDefault();
        if($scope.editForm.$valid && !$scope.ageError) {
        model.country = $scope.country;
        $scope.model = model;
        model.gender = $scope.model.gender;
        $scope.model.gender = model.gender;
        $scope.model = commonService.calculation(model) ;
       	$scope.model.additionalMonthlySavings = parseFloat($scope.model.globalAdditionalMonthlySavings);
		    $scope.model.additionalLumpSum = parseFloat($scope.model.globalAdditionalLumpSum);
		    $scope.model.shortfallSurplus = parseFloat($scope.model.globalShortFallSurplus);
		    $scope.model.totalFundRequired = parseFloat($scope.model.globalTotalFundRequired);
		    $scope.model.totalFundAvailable = parseFloat($scope.model.globalTotalFundAvailable);
        $scope.model.cash = parseFloat(model.cash);
        $scope.model.childName = model.childName;
        $scope.model.childAge = model.childAge;
        $scope.model.max = $scope.max;
        $scope.model.gender = model.gender;
        $scope.model.country = model.country;
        $scope.model.cashRor = parseFloat(model.cashRor);
        $scope.model.insuranceCash = parseFloat(model.insuranceCash);
        $scope.model.insuranceRor = parseFloat(model.insuranceRor);
        $scope.model.lumpsumpCash = parseFloat(model.lumpsumpCash);
        $scope.model.shortTotalFundAvailable = parseFloat(model.cash) + parseFloat(model.insuranceCash);
        $scope.model.lumpsumAvailable =  $scope.model.additionalLumpSum + $scope.model.shortTotalFundAvailable;
        $rootScope.model = $scope.model;
       // commonService($scope.model);
		   // localStorage.setItem('model', '$scope.model');
	    	//$location.path('/report');
        $rootScope.back('report');
	     	//console.log($scope.model);
       }
       else {
       // $event.preventDefault();
        $scope.editForm.submitted= true;
        return false;
      }
       }
       function init(){
        $scope.setCountry($scope.model.country);
        $scope.setGender($rootScope.model.gender);
       }
       init();
       $rootScope.model= $scope.model;

       
   };

   EditController.$inject = ['$scope','$rootScope','$location','commonService', '$window'];
   EduPlanner.controller("EditController", EditController);

 }());
