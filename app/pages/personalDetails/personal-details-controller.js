(function(){ 
 // "use strict";
   var PersonalDetailsController = function ($scope, $rootScope,$location, commonService ) {
   	 $rootScope.hideLayout = true;
     $scope.model = $rootScope.model;
     //$scope.model.name = "Jonathan Lee";
     $scope.hasFocus = false;
   	 $scope.$location = $location;
     $scope.gender = $scope.model.gender;
     $scope.isMale=true;
     $scope.submitted = false;
     $scope.max = 21;
    
      if($scope.gender!='Male') 
      {
        $scope.isMale=false; 
        $scope.max = 19;
      }
      else
      {
        $scope.max = 21;
      }



      //Child age min and max validation
      $scope.ageError = false;
      //select options for male
      $scope.ageMaleArr = [];
      for(i=0;i<=$scope.max - 1;i++){
        $scope.ageMaleArr.push(i);        
      }
      //select options for female
      $scope.ageFemaleArr = [];
      for(i=0;i<=$scope.max - 3;i++){
        $scope.ageFemaleArr.push(i);        
      }
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


/*      $scope.$watch("model.name", function(newValue, oldValue) {
          $scope.model.name=newValue;       
          $scope.applyScope($scope);
        });*/

      //--set gender selection from view.
      $scope.setGender=function(selectedGender){
        $scope.gender=selectedGender;         
        if(selectedGender=="Male"){               
          $scope.isMale=true;
          //console.log('male');
        }
        else{                     
          $scope.isMale=false;
         // console.log('female');
        } 
        $scope.childAgeValidation();
      };
      
      /* $scope.applyScope($scope);*/
/*      $scope.applyScope=function(scope){  
        if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
          scope.$apply();
        }
      };   */ 

      $scope.update = function($event, model) {
         $event.preventDefault();
         //$event.stopPropagation();
      	if($scope.userForm.$valid && $scope.childAgeValidation(true)) {
          $scope.model.gender =$scope.gender;
          $rootScope.model.max = $scope.max;
           //$location.path('/educationTarget');
          $rootScope.next('educationTarget');
       }
       else {
       // $event.preventDefault();
        $scope.userForm.submitted= true;
        return false;
      }
     };
      function init () {
        $scope.setGender($rootScope.model.gender);
      }
      init();

      
   };

   PersonalDetailsController.$inject = ['$scope','$rootScope','$location','commonService'];
   EduPlanner.controller("PersonalDetailsController", PersonalDetailsController);


 }());
