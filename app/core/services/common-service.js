(function(){ 
  "use strict";
  angular.module("EduPlanner").factory('commonService', function(calculatorService){ 
   /*var msgs = [];
   return function(msg) {
     msgs.push(msg);
      console.log(msgs);
   };*/
    var items = [];
    var itemsService = {};
    
    itemsService.add = function(item) {
        items.push(item);
        console.log(items.push(item))
    };
    itemsService.list = function() {
        return items;
    };
   
    itemsService.calculation = function(item){
    	var obj = {}; var float = 
            obj.weightedAnnualROR = parseFloat(calculatorService.calculateWeightedAnnualROR(parseFloat(item.cash),parseFloat(item.cashRor),parseFloat(item.insuranceCash),parseFloat(item.insuranceRor)));
            obj.totalFundRequired = parseFloat(calculatorService.calculateTotalFundRequired(item.gender,item.childAge,item.country));
		        obj.period = parseFloat(calculatorService.calculatePeriod(item.gender, item.childAge));
            obj.totalFundAvailable = parseFloat(calculatorService.calculateTotalFundAvailable(parseFloat(item.cash),parseFloat(item.insuranceCash),parseFloat(item.lumpsumpCash),parseFloat(item.cashRor),parseFloat(item.insuranceRor),obj.period));
            obj.shortfallSurplus = parseFloat(obj.totalFundAvailable)-parseFloat(obj.totalFundRequired);
            obj.additionalLumpSum = parseFloat(calculatorService.calculateAdditionalLumpSum(obj.totalFundRequired, obj.totalFundAvailable, obj.weightedAnnualROR, obj.period));
            obj.additionalMonthlySavings = parseFloat(calculatorService.calculateAdditionalMonthlySavings(obj.totalFundRequired, obj.totalFundAvailable, obj.weightedAnnualROR, obj.period));
            obj.oldAdditionalMonthlySavings = parseFloat(obj.additionalMonthlySavings);
            obj.oldAdditionalLumpSum = parseFloat(obj.additionalLumpSum);
            obj.newAdditionalLumpSum = 0;
            obj.gapAdditionalLumpSum = 0;
            obj.gapAdditionalMonthlySavings = 0;
            obj.newAdditionalMonthlySavings = 0;
            obj.globalTotalFundRequired = parseFloat(obj.totalFundRequired);
            obj.globalTotalFundAvailable = parseFloat(obj.totalFundAvailable);
            obj.globalShortFallSurplus =  parseFloat(obj.totalFundAvailable)-parseFloat(obj.totalFundRequired);
            obj.globalAdditionalLumpSum = parseFloat(obj.additionalLumpSum);
            obj.globalAdditionalMonthlySavings = parseFloat(obj.additionalMonthlySavings);
            obj.globalWeightedROR = parseFloat(obj.weightedAnnualROR);
            obj.globalPeriod = parseFloat(obj.period);
           // console.log(obj);
            return obj;
    }
   


     return itemsService;

   /* itemsService.reportCalculation = function(){

    } */
});

}());



