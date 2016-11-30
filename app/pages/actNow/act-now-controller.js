(function(){ 
  "use strict";
   var ActNowController = function ($scope, $rootScope,$location,calculatorService) {
   	 $rootScope.hideLayout = true;
   	 $scope.$location = $location;
     $scope.model = $rootScope.model;
     $scope.name = $scope.model.name;
     $scope.childName = $scope.model.childName;
   	 $scope.delayYears = $scope.model.delayYears +1;
     var obj = $scope.model;
     $scope.min = 0;
     if($scope.model.gender ==="Male"){
     $scope.max = 20 - parseFloat(obj.childAge);
     }
     else{
       $scope.max = 18 - parseFloat(obj.childAge);
     }
     $scope.oldAdditionalMonthlySavings = obj.oldAdditionalMonthlySavings;
     $scope.gapAdditionalMonthlySavings = 0;
     $scope.oldAdditionalLumpSum = obj.oldAdditionalLumpSum;
     $scope.gapAdditionalLumpSum = 0;
     //$scope.newAdditionalLumpSum = obj.newAdditionalLumpSum;
     $scope.delay =function(){
      if ($scope.model.delayYears !== 0){
        obj.newAdditionalLumpSum = calculatorService.calculateAdditionalLumpSum(obj.totalFundRequired, obj.totalFundAvailable, obj.weightedAnnualROR, obj.globalPeriod-obj.delayYears);
        obj.gapAdditionalLumpSum= obj.newAdditionalLumpSum - obj.oldAdditionalLumpSum;
        obj.newAdditionalMonthlySavings = calculatorService.calculateAdditionalMonthlySavings(obj.totalFundRequired, obj.totalFundAvailable, obj.weightedAnnualROR, obj.globalPeriod- obj.delayYears);
        obj.gapAdditionalMonthlySavings = obj.newAdditionalMonthlySavings - obj.oldAdditionalMonthlySavings;
        obj.newAdditionalMonthlySavings = obj.newAdditionalMonthlySavings;
        $scope.gapAdditionalLumpSum = obj.gapAdditionalLumpSum;
        $scope.oldAdditionalMonthlySavings = obj.oldAdditionalMonthlySavings;
        $scope.gapAdditionalMonthlySavings = obj.gapAdditionalMonthlySavings;
        //console.log( obj.oldAdditionalMonthlySavings);
        //console.log( obj.gapAdditionalMonthlySavings);
     }  
     else
     {
       return false;
     }
   }
    angular.element(document).ready(function () {
        $("#slider").on({
        slide: function(){
         var x = parseInt($("#slider").val());
           $('[data-replace="slider"]').text(x);
              $("#slider").find('.tooltip').show();
              $scope.model.delayYears =  parseInt($("#slider").val());
              $scope.delay();
        }
    });
    });


    $scope.thankyou= function(){
        $location.path('/thankyou');
      };
      
   };

   ActNowController.$inject = ['$scope','$rootScope','$location','calculatorService'];
   EduPlanner.controller("ActNowController", ActNowController);


 }());
