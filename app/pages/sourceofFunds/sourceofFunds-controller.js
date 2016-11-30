(function(){ 
  //"use strict";
  
    var SourceofFundsController = function ($scope, $rootScope,$location,commonService,calculatorService) {
       $rootScope.hideLayout = true;
         $scope.$location = $location;
         //$scope.model = $rootScope.model;
         $scope.submitted = false;
         var obj = $scope.model;
         $scope.country =$scope.model.country;
         $scope.childName = $scope.model.childName;
          if($scope.model.gender!='Male') 
          {
               $scope.max = 19;
          }
           else
          {
            $scope.max = 21;
          }
         $scope.updateAccount = function($event, model) {
         $event.preventDefault();
         //$event.stopPropagation();
         if($scope.accountForm.$valid && $scope.validateCashAndInsurance(true)) {
           // console.log(model);
            $scope.model = commonService.calculation(model);
            //console.log($scope.model);
            $scope.model.name = model.name;
            $scope.model.max = $scope.max;
            $scope.model.childName = model.childName;
            $scope.model.gender = $rootScope.model.gender;
            $scope.model.country = model.country;
            $scope.model.childAge = model.childAge;
            $scope.model.cash = parseFloat(model.cash);
            $scope.model.cashRor = parseFloat(model.cashRor);
            $scope.model.insuranceCash = parseFloat(model.insuranceCash);
            $scope.model.insuranceRor = parseFloat(model.insuranceRor);
            $scope.additionalMonthlySavings = parseFloat($scope.model.additionalMonthlySavings);
            $scope.model.shortTotalFundAvailable = $scope.model.cash + $scope.model.insuranceCash;
            $scope.model.lumpsumAvailable =  parseFloat($scope.model.additionalLumpSum) + parseFloat($scope.model.shortTotalFundAvailable);
            $scope.model.lumpsumpCash = parseFloat(model.lumpsumpCash);
            $rootScope.model = $scope.model;
           // commonService.add(obj);
            //console.log('SourceofFund' + commonService.add(obj));
            //$location.path('/report');
            $rootScope.next('report');
          }
         else {
         // $event.preventDefault();
          $scope.accountForm.submitted= true;
          return false;
        }
      };
      $rootScope.model = $scope.model;
      

      //check 

      $scope.showError = false;
      $scope.validateCashAndInsurance = function()
      {
        if ($scope.model.cash == 0 && $scope.model.insuranceCash == 0) {
          $scope.showError = true;
          return false;
        }
        else{
          $scope.showError = false;
          return true;
        };
      }
   };
    
    SourceofFundsController.$inject = ['$scope','$rootScope','$location','commonService','calculatorService'];
    EduPlanner.controller("SourceofFundsController", SourceofFundsController);

 }());
