/**
 * Main module that encapsulates all the business logic
 * for calculating all the values.
 *
 * @author Kevin Luo
 */
(function () {
  //"use strict";

 angular.module("EduPlanner").service('calculatorService', function () {

	var _INVESTMENT_AND_INSURANCE = "investment_and_insurance_savings",
			_CPF = "cp_savings",
			_CASH = "cash_savings",
			_ADDITIONAL_LUMP_SUM = "additional_lump_sum_retire_age",
			_REGULAR_INCOME_AT_RETIRE_AGE = "additional_regular_income_retire_age";
		
	var MALE_UNIVERSITY_ENTRY_AGE = 21;
	var FEMALE_UNIVERSITY_ENTRY_AGE = 19;
	
	var SG_2013_TUITIONFEE = 30000;
	var SG_2013_LIVINGFEE = 0;
	var SG_TUITION_INFLATION_RATE = 0.029;
	var SG_LIVING_INFLATION_RATE = 0.025;
	
	var AU_2013_TUITIONFEE = 171050;
	var AU_2013_LIVINGFEE = 90950;
	var AU_TUITION_INFLATION_RATE = 0.052;
	var AU_LIVING_INFLATION_RATE = 0.028;
	
	var US_2013_TUITIONFEE = 145653;
	var US_2013_LIVINGFEE = 71347;
	var US_TUITION_INFLATION_RATE = 0.036;
	var US_LIVING_INFLATION_RATE = 0.024;
	
	var UK_2013_TUITIONFEE = 64784;
	var UK_2013_LIVINGFEE = 76216;
	var UK_TUITION_INFLATION_RATE = 0.102;
	var UK_LIVING_INFLATION_RATE = 0.026;
	
	var CASH_ROR = 0.002;
	var INVEST_ROR = 0.05;
	var DEFAULT_WEIGHTED_ROR = 0.026;



	
	
	
	
	/**
	 * This method will calculate the education expense in singapore, australia, united states, united kindom
	 * 
	 * @param country - SG, AU, US, UK
	 * @param expenseType - TUITIONFEE, LIVINGFEE, TOTALFEE
	 * @param year - should be equal or greater than 2015
	 * @returns expense 
	 */
	this.calculateUniversityExpense = function(country, expenseType, year){
		//if your child enters into university at <year> in <country>, return the cost to get 4 years degree

		var expense = 0;
		if (country == 'SG'){
			if (expenseType == 'TUITIONFEE'){
				expense = Math.round(SG_2013_TUITIONFEE*Math.pow(1+SG_TUITION_INFLATION_RATE,year-2013)/1000)*1000;
			}else if (expenseType == 'LIVINGFEE'){
				expense = Math.round(SG_2013_LIVINGFEE*Math.pow(1+SG_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}if (expenseType == 'TOTALFEE'){
				expense = Math.round(SG_2013_TUITIONFEE*Math.pow(1+SG_TUITION_INFLATION_RATE,year-2013)/1000)*1000 + Math.round(SG_2013_LIVINGFEE*Math.pow(1+SG_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}
		}else if (country == 'AU'){
			if (expenseType == 'TUITIONFEE'){
				expense = Math.round(AU_2013_TUITIONFEE*Math.pow(1+AU_TUITION_INFLATION_RATE,year-2013)/1000)*1000;
			}else if (expenseType == 'LIVINGFEE'){
				expense = Math.round(AU_2013_LIVINGFEE*Math.pow(1+AU_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}if (expenseType == 'TOTALFEE'){
				expense = Math.round(AU_2013_TUITIONFEE*Math.pow(1+AU_TUITION_INFLATION_RATE,year-2013)/1000)*1000 + Math.round(AU_2013_LIVINGFEE*Math.pow(1+AU_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}
		}else if (country == 'US'){
			if (expenseType == 'TUITIONFEE'){
				expense = Math.round(US_2013_TUITIONFEE*Math.pow(1+US_TUITION_INFLATION_RATE,year-2013)/1000)*1000;
			}else if (expenseType == 'LIVINGFEE'){
				expense = Math.round(US_2013_LIVINGFEE*Math.pow(1+US_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}if (expenseType == 'TOTALFEE'){
				expense = Math.round(US_2013_TUITIONFEE*Math.pow(1+US_TUITION_INFLATION_RATE,year-2013)/1000)*1000 + Math.round(US_2013_LIVINGFEE*Math.pow(1+US_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}
		}else if (country == 'UK'){
			if (expenseType == 'TUITIONFEE'){
				expense = Math.round(UK_2013_TUITIONFEE*Math.pow(1+UK_TUITION_INFLATION_RATE,year-2013)/1000)*1000;
			}else if (expenseType == 'LIVINGFEE'){
				expense = Math.round(UK_2013_LIVINGFEE*Math.pow(1+UK_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}if (expenseType == 'TOTALFEE'){
				expense = Math.round(UK_2013_TUITIONFEE*Math.pow(1+UK_TUITION_INFLATION_RATE,year-2013)/1000)*1000 + Math.round(UK_2013_LIVINGFEE*Math.pow(1+UK_LIVING_INFLATION_RATE,year-2013)/1000)*1000;
			}
		}
		return expense;
	}
	
	/**
	 * This method will calculate the lump sum future value of base amount after some period based on annual ror
	 * 
	 * @param amount - base amount
	 * @param period - to get the future value of amount in this period (years)
	 * @param weightedROR	- indicate the yearly investment rate
	 * @returns future value
	 */
	 this.calculateLumpSumFutureValue = function(amount, period, weightedROR){
		
		return (amount*Math.pow(1+weightedROR,period));
	}
	
	/**
	 * This method will calculate the monthly savings future value of base amount after some period based on annual ror
	 * 
	 * @param amount - base amount
	 * @param period - to get the future value of amount in this period (years)
	 * @param weightedROR	- indicate the yearly investment rate
	 * @returns future value
	 */
	this.calculateMonthlySavingsFutureValue = function(amount, period, weightedROR){
		
		var rate = Math.pow(1+weightedROR,1/12)-1;
		var nper = period*12;
		var pmt  = -amount;
		var pv = 0;
		var monthlySavingsFutureValue = Math.round(Formulate.FV(rate, nper, pmt, pv, 0)*100)/100;
		
		
		return monthlySavingsFutureValue;
	}
	/**
	 * This method will calculate the future value of base amount after some period based on annual ror
	 * 
	 * @param cashAmount - cash amount
	 * @param investAmount - investment amount
	 * @param cashROR - cash annual ROR
	 * @param investROR - investment annual ROR
	 * @returns weighted ROR
	 */
	this.calculateWeightedAnnualROR = function(cashAmount, cashROR, investAmount, investROR){
		
		if (cashAmount == 0 && investAmount == 0)
			return DEFAULT_WEIGHTED_ROR;
		else{
			var rawValue =  (cashAmount*cashROR+investAmount*investROR)/(cashAmount+investAmount);
			return Math.round(rawValue*100)/100;
		}
	}	
	/**
	 * This method will calculate the future value of base amount after some period based on annual ror
	 * 
	 * @param cashAmount - cash the customer owns
	 * @param investAmount - investment & insurance customer owns
	 * @param lumSumAmount	- lum sum amount customer wil put
	 * @param period - calculate future value after years
	 * @returns total future value
	 */
	this.calculateTotalFundAvailable = function(cashAmount, investAmount, lumpSumAmount,cashROR,investROR, period){
		
		var totalFutureValue = 0;
		totalFutureValue = totalFutureValue + this.calculateLumpSumFutureValue(cashAmount, period, cashROR/100);
		totalFutureValue = totalFutureValue + this.calculateLumpSumFutureValue(investAmount, period, investROR/100);
		totalFutureValue = totalFutureValue + lumpSumAmount;
		
		return Math.round(totalFutureValue);
	}
	
	/**
	 * This method will calculate the future value of base amount after some period based on annual ror
	 * 
	 * @param childGender - Male or Female
	 * @param childAge - child age
	 * @param country  - SG, AU, US, UK
	 * @returns total fund available
	 */
	this.calculateTotalFundRequired = function(childGender, childAge, country){
		
		var period = this.calculatePeriod(childGender, childAge);
		var totalFundRequired = 0;
		totalFundRequired = this.calculateUniversityExpense(country, 'TOTALFEE', parseInt(new Date().getFullYear(),10) + period);
		return totalFundRequired;
	}
	/**
	 * This method will calculate the period based on child gender and child age
	 * 
	 * @param childGender - Male or Female
	 * @param childAge - child age
	 * @returns period
	 */
	this.calculatePeriod = function(childGender, childAge){
		
		var period = 0;
		if(childGender == 'Male'){
			period = MALE_UNIVERSITY_ENTRY_AGE - childAge;
		}else if(childGender == 'Female'){
			period = FEMALE_UNIVERSITY_ENTRY_AGE - childAge;
		}
		return period;
	}
	
	/**
	 * This method will calculate the additional lump sum to reach the goal
	 * 
	 * @param totalFundRequired - total fund required
	 * @param totalFundAvailable - total fund available
	 * @param weighted ROR
	 * @param period  - period
	 * @returns additional lump sum to reach the goal
	 */
	this.calculateAdditionalLumpSum = function(totalFundRequired, totalFundAvailable, weightedROR, period){
		
		var suplusAmount = totalFundRequired - totalFundAvailable;
		var isSurplusAmount = totalFundAvailable - totalFundRequired;
		var addtionalLumpSum = 0;
		if(isSurplusAmount > 0)
			return addtionalLumpSum;
		var newWeightedROR = Math.round((weightedROR/100)*10000)/10000;
		 addtionalLumpSum = Math.ceil(suplusAmount/Math.pow(1+newWeightedROR,period));
		
		return addtionalLumpSum;
	}
	
	/**
	 * This method will calculate the additional lump sum to reach the goal
	 * 
	 * @param totalFundRequired - total fund required
	 * @param totalFundAvailable - total fund available
	 * @param weighted ROR
	 * @param period  - period
	 * @returns additional monthly savings to reach the goal
	 */
	this.calculateAdditionalMonthlySavings = function(totalFundRequired, totalFundAvailable, weightedROR, period){
		
		
		
		var suplusAmount = totalFundAvailable - totalFundRequired;
		var rate = Math.pow(1+weightedROR/100,1/12)-1;
		var nper = period*12;
		var pv = 0;
		var fv = 0;
		var type = 0;
		if (suplusAmount < 0)
			fv = suplusAmount;
		
		var addtionalMonthlySavings = Math.ceil(Formulate.PMT({rate : rate, nper : nper, pv : pv,  fv : fv, type : type }));
		
		
		return addtionalMonthlySavings;
	}


/**
 * Helper class for calculating specific areas of the table
 */
var Formulate = {

	/**
	 * This is a 'generic' function that will calculate the Future Value
	 * 
	 * @param rate - interest rate per period
	 * @param Nper - total number of paypent per period
	 * @param pmt  - payment made each period
	 * @param pv   - present value
	 * @param type - timing of payment ( 0 - end of the period, 1 beginning of period)
	 */
	FV: function(rate, nper, pmt, pv, type) {
		/*
		pv = (pv ? pv : 0);
        type = (type ? type : 0);
        
        var result = -(
                pv*Math.pow(1.0+rate, nper)
                + pmt * (1.0 + rate*type)
                        * (Math.pow(1.0+rate, nper) - 1.0) / rate
        );
		*/
		var pow = Math.pow(1 + rate, nper),fv;

		if (rate) {
		   fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
		} else {
		   fv = -1 * (pv + pmt * nper);
		}

        return fv;
	},

	PV: function(params) {

		var rate = params.rate;
		var nper = params.nper;
		var pmt = params.pmt;
		var fv = params.fv;
		var type = params.type;

        fv = fv || 0;
        type = type || 0;

        var pv;
        if (rate != 0) {
                pv = (-pmt * (1 + rate * type) * ((Math.pow(1 + rate, nper) - 1) / rate) - fv) / Math.pow(1 + rate, nper);
        } else {
                pv = -fv - pmt * nper;
        }

        return pv;
    },

    PMT: function(params){
    	var rate = params.rate;
    	var nper = params.nper;
    	var pv = params.pv;
    	var fv = params.fv; 
    	var type = params.type;

        fv = fv || 0;
        type = type || 0;

        // pmt = rate / ((1 + rate)^N - 1) * -(pv * (1 + r)^N + fv)
        var pmt = rate / (Math.pow(1 + rate, nper) - 1)
                * -(pv * Math.pow(1 + rate, nper) + fv);

        // account for payments at beginning of period versus end.
        if (type == 1) {
                pmt = pmt / (1 + rate);
        }

        return pmt;
    },

    NPER: function(rate, payment, pv, fv, type) { 

		fv = (fv ? fv : 0);
	    type = (type ? type : 0);
	    var invert = (payment < 0 ? true : false);
	    payment = Math.abs(payment);
	    
	    var _a = (-(payment) * (1.0 + rate * type) + (-1.0 / rate) * fv);
	    var _b = (pv * rate + -(payment) * (1.0 + rate * type));
	    var _val = _a / _b;

	    var v = (
	            Math.log(_val) / Math.log(1.0 + rate)
	    );

	    return (invert ? v : -v);
    },

    NPER2 : function (Rate, Pmt, PV, FV, Type) {
      
      FV=FV || 0; // default value of 0;
      Type=Type || 0; // default value of 0;
                  
      var totalIncomeFromFlow;
      var sumOfPvAndPayment;
      var currentValueOfPvAndPayment;
      
      if (Rate == 0 && Pmt == 0) {
            alert("Invalid Pmt argument");
            return null;
      }
      else if (Rate == 0)
            return (- (PV + FV) / Pmt);
      else if (Rate <= -1) {
            alert("Invalid Pmt argument");
            return null;
      }
      
      totalIncomeFromFlow = (Pmt / Rate);
      if (Type == 1) {
            totalIncomeFromFlow *= (1 + Rate);
      }

      sumOfPvAndPayment = (-FV + totalIncomeFromFlow);
      currentValueOfPvAndPayment = (PV + totalIncomeFromFlow);
      if ((sumOfPvAndPayment < 0) && (currentValueOfPvAndPayment < 0)) {
            sumOfPvAndPayment = -sumOfPvAndPayment;
            currentValueOfPvAndPayment = 0-currentValueOfPvAndPayment;
      }
      else if ((sumOfPvAndPayment <= 0) || (currentValueOfPvAndPayment <= 0)) {
            alert("NPer cannot be calculated");
            return null;
      }

      totalInterestRate = sumOfPvAndPayment / currentValueOfPvAndPayment;
      return Math.log(totalInterestRate) / Math.log(Rate + 1);
	},

    roundUp : function(originalNumber, decimalPlaces) {
		if (decimalPlaces == undefined) {
			return Math.round(originalNumber);
		}
		else {
			var _temp = originalNumber * Math.pow(10, decimalPlaces)
			var _temp2 = Math.round(_temp)
			var roundedValue = _temp2 / Math.pow(10, decimalPlaces)
			return (roundedValue);
		}
	}
};

var Formatter = {

	formatNumber : function(num, decimal) {
		var _decimal = (decimal || 2);
    	return num.toFixed(_decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	},

	roundUP : function(number, decimal) {
		var _decimal = (decimal || 0);
		return Math.round(number, _decimal);
	},

	moveDecimals : function(number, decimal) {
		var _decimal = (decimal || 2);
		//var result = Math.round(((number + 0.00001) * 100), _decimal) / 100;
		//console.log("decimal: " + _decimal + ", result: " + result);
		var result = number.toFixed(_decimal);
		return result;
	},

	FormatJSONAssetValues : function( _InvestmentAndInsuranceArr, _CPFArr, _CashArr, _AdditionallumpSumArr, _AdditionalRegularIncomeRetireAgeArr, data) {
		var formatted = [];

		for (var i = 0; i < _InvestmentAndInsuranceArr.length; i++) {
			formatted[i] = {
				BeforeRetirementInflation : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].BeforeRetirementInflation,
					CPF : _CPFArr[i].BeforeRetirementInflation,
					Cash :_CashArr[i].BeforeRetirementInflation,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].BeforeRetirementInflation : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].BeforeRetirementInflation : 0,
					total : 0
				},
				AfterRetirementInflation : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].AfterRetirementInflation,
					CPF : _CPFArr[i].AfterRetirementInflation,
					Cash :_CashArr[i].AfterRetirementInflation,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].AfterRetirementInflation : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].AfterRetirementInflation : 0,
					total : 0
				},
				SavingPeriodInvestmentReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].SavingPeriodInvestmentReturns,
					CPF : _CPFArr[i].SavingPeriodInvestmentReturns,
					Cash :_CashArr[i].SavingPeriodInvestmentReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].SavingPeriodInvestmentReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].SavingPeriodInvestmentReturns : 0,
					total : data.SavingPeriodInvestmentReturns
				},
				SavingPeriodWeightedInvestmentReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].SavingPeriodWeightedInvestmentReturns,
					CPF : _CPFArr[i].SavingPeriodWeightedInvestmentReturns,
					Cash :_CashArr[i].SavingPeriodWeightedInvestmentReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].SavingPeriodWeightedInvestmentReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].SavingPeriodWeightedInvestmentReturns : 0,
					total : data.TotalSavingPeriodWeightedInvestmentReturns
				},
				SavingPeriodRealReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].SavingPeriodRealReturns,
					CPF : _CPFArr[i].SavingPeriodRealReturns,
					Cash :_CashArr[i].SavingPeriodRealReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].SavingPeriodRealReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].SavingPeriodRealReturns : 0,
					total : data.TotalSavingPeriodRealReturns
				},
				SavingPeriodWeightedRealReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].SavingPeriodWeightedRealReturns,
					CPF : _CPFArr[i].SavingPeriodWeightedRealReturns,
					Cash :_CashArr[i].SavingPeriodWeightedRealReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].SavingPeriodWeightedRealReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].SavingPeriodWeightedRealReturns : 0,
					total : data.TotalSavingPeriodWeightedRealReturns
				},
				RetirementPeriodInvestmentReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].RetirementPeriodInvestmentReturns,
					CPF : _CPFArr[i].RetirementPeriodInvestmentReturns,
					Cash :_CashArr[i].RetirementPeriodInvestmentReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].BeforeRetirementInflation : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].BeforeRetirementInflation : 0,
					total : data.TotalRetirementPeriodInvestmentReturns
				},
				RetirementPeriodWeightedInvestmentReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].RetirementPeriodWeightedInvestmentReturns,
					CPF : _CPFArr[i].RetirementPeriodWeightedInvestmentReturns,
					Cash :_CashArr[i].RetirementPeriodWeightedInvestmentReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].RetirementPeriodWeightedInvestmentReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].RetirementPeriodWeightedInvestmentReturns : 0,
					total : data.TotalRetirementPeriodWeightedInvestmentReturns
				},
				RetirementPeriodRealReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].RetirementPeriodRealReturns,
					CPF : _CPFArr[i].RetirementPeriodRealReturns,
					Cash :_CashArr[i].RetirementPeriodRealReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].RetirementPeriodRealReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].RetirementPeriodRealReturns : 0,
					total : data.TotalRetirementPeriodRealReturns
				},
				RetirementPeriodWeightedRealReturns : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].RetirementPeriodWeightedRealReturns,
					CPF : _CPFArr[i].RetirementPeriodWeightedRealReturns,
					Cash :_CashArr[i].RetirementPeriodWeightedRealReturns,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].RetirementPeriodWeightedRealReturns : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].RetirementPeriodWeightedRealReturns : 0,
					total : data.TotalRetirementPeriodWeightedRealReturns
				},
				MixPercentBefore : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].MixPercentBefore,
					CPF : _CPFArr[i].MixPercentBefore,
					Cash :_CashArr[i].MixPercentBefore,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].MixPercentBefore : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].MixPercentBefore : 0,
					total : data.TotalMixPercentBefore
				},
				MixPercentAfter : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].MixPercentAfter,
					CPF : _CPFArr[i].MixPercentAfter,
					Cash :_CashArr[i].MixPercentAfter,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].MixPercentAfter : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].MixPercentAfter : 0,
					total : data.TotalMixPercentAfter
				},
				RetirementAnnualPmt : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].RetirementAnnualPmt,
					CPF : _CPFArr[i].RetirementAnnualPmt,
					Cash :_CashArr[i].RetirementAnnualPmt,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].RetirementAnnualPmt : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].RetirementAnnualPmt : 0,
					total : data.TotalRetirementAnnualPmt
				},
				RetirementAnnualPmt : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].RetirementAnnualPmt,
					CPF : _CPFArr[i].RetirementAnnualPmt,
					Cash :_CashArr[i].RetirementAnnualPmt,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].RetirementAnnualPmt : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].RetirementAnnualPmt : 0,
					total : data.TotalRetirementAnnualPmt
				},
				DollarBalBefore : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].DollarBalBefore,
					CPF : _CPFArr[i].DollarBalBefore,
					Cash :_CashArr[i].DollarBalBefore,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].DollarBalBefore : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].DollarBalBefore : 0,
					total : data.TotalDollarBalBefore
				},
				DollarBalAfter : {
					InvestmentAndInsurance : _InvestmentAndInsuranceArr[i].DollarBalAfter,
					CPF : _CPFArr[i].DollarBalAfter,
					Cash :_CashArr[i].DollarBalAfter,
					AddLumpSumSavings : (_AdditionallumpSumArr) ? _AdditionallumpSumArr[i].DollarBalAfter : 0,
					AddRegularIncomeRetireAge : (_AdditionalRegularIncomeRetireAgeArr) ? _AdditionalRegularIncomeRetireAgeArr[i].DollarBalAfter : 0,
					total : data.TotalDollarBalAfter
				}
			};
		}

		return formatted;
	},

	FormRetirementTableValues : function(_ageArr, _InvestmentAndInsuranceArr, _CPFArr, _CashArr, _AdditionallumpSumArr, _AdditionalRegularIncomeRetireAgeArr) {
		var retirementTable = [];

		var totalAssets = 0;

		for (var i = 0; i < _ageArr.length; i++) {
			totalAssets = _InvestmentAndInsuranceArr[i] + _CPFArr[i] + _CashArr[i] + _AdditionallumpSumArr[i] + _AdditionalRegularIncomeRetireAgeArr[i];
		 	retirementTable[i] = {
		 		age : _ageArr[i], 
		 		InvestmentAndInsurance : _InvestmentAndInsuranceArr[i], 
		 		CPF : _CPFArr[i],
		 		Cash : _CashArr[i],
		 		AddLumpSumSavings : _AdditionallumpSumArr[i],
		 		AddRegularIncomeRetireAge : _AdditionalRegularIncomeRetireAgeArr[i],
		 		TotalAsset : totalAssets
		 	};
		 	totalAssets = 0;
		 }

		 return retirementTable;
	}
}
});
}());