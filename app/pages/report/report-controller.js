(function(){ 
  // "use strict";
   var ReportController = function ($scope, $rootScope,$location,limitToFilter,commonService, chart, $timeout) {
     $rootScope.hideLayout = true;
     $scope.$location = $location;
     $scope.model = $rootScope.model;
     //var floor = Math.floor;
     $scope.surplusChart = false;
     $scope.initial = 0;
     $scope.isMonthly = false;
     $scope.isLumpSum = true;
     $scope.name = $scope.model.name;
     $scope.isMale = true;
     $scope.childName = $scope.model.childName;
     $scope.country = $scope.model.country;
     $scope.gender = $scope.model.gender;
     $scope.childAge = $scope.model.childAge;
     $scope.max = $scope.model.max;
     $scope.cash = $scope.model.cash;
     $scope.cashRor = $scope.model.cashRor;
     $scope.insuranceCash = $scope.model.insuranceCash;
     $scope.insuranceRor = $scope.model.insuranceRor;
     $scope.additionalMonthlySavings = $scope.model.additionalMonthlySavings
     $scope.totalFundRequired = parseFloat($scope.model.totalFundRequired);
     $scope.totalFundAvailable = parseFloat($scope.model.totalFundAvailable);
     $scope.shortfallSurplus = Math.abs(parseFloat($scope.model.shortfallSurplus));
     $scope.additionalLumpSum = parseFloat($scope.model.additionalLumpSum);
     $scope.shortTotalFundAvailable = parseFloat($scope.model.shortTotalFundAvailable);
     $scope.lumpsumAvailable =  parseFloat($scope.model.lumpsumAvailable);
     $scope.childName = $scope.model.childName;
     $scope.chartLumpsumConfig = chart;
     $scope.chartMonthlyConfig = chart;
     $scope.chartSurplusConfig = chart;
     if($scope.country === 'SG'){
      $scope.countryText = 'Singapore';
     } else if($scope.country === 'AU'){
      $scope.countryText = 'Australia';
     } else if($scope.country === 'US'){
      $scope.countryText = 'United States';
     } else if($scope.country === 'UK'){
      $scope.countryText = 'United Kingdom';
     } else{
      return false;
     }
      if($scope.model.gender!='Male') 
      {
        $scope.isMale=false; 
        $scope.max = 19;
        $scope.femaleTargetAge = 19 - $scope.model.childAge;
      }
      else if($scope.model.gender ==='Male')
      {
        $scope.max = 21;
        $scope.savingperiod = 21- $scope.model.childAge;
      }
      else{
        return false;
      }
        $scope.showFirstTab = function(){
        //angular.element('[data-target="#tab2"]').tab('hide');
         angular.element('[data-target="#tab1"]').tab('show');
        $scope.isLumpSum = true;
        $scope.isMonthly = false;
        // $scope.chartLumpsumConfig.title.text = "Setting new title"; //Works   
         $scope.chartLumpsumConfig.series = [
             {
              type: 'area',
              name: 'lumpsum',
              data: [$scope.lumpsumAvailable, $scope.totalFundRequired],
              lineWidth: 5,
              lineColor: '#8daebe',
            color : '#DAE1FA',
              fillOpacity : .7,
              showInLegend: false,
              index:1
              
            },
            {
              type: 'area',            
              name: 'available',
              data: [$scope.shortTotalFundAvailable, $scope.totalFundAvailable],
              lineWidth: 5,
              lineColor : '#b08658',
              fillOpacity : .7,
              color : '#dacbb5',
              showInLegend: false,
              index:3

            },
             {
              type: 'area',
              name: 'additionalMonthly',
              data: [$scope.shortTotalFundAvailable + $scope.additionalMonthlySavings, $scope.totalFundRequired],
              dashStyle: 'ShortDash',
              color : '#DAE1FA',
              lineColor : '#D7E5FF',
              lineWidth: 3,
              fillOpacity : .7,
              showInLegend: false,
              shadow : 'false',
              index:2
              
            }
          ]

          $scope.chartLumpsumConfig.xAxis = [{ 
             categories: [ $scope.childName + ' at <strong>' + $scope.childAge +'</strong> yrs old', $scope.childName + ' at <strong>' + $scope.max +'</strong> yrs old'],
                      gridLineWidth: 0,
                      tickmarkPlacement: 'on',
                      title: {
                          enabled: false
                      }
         }]
          $scope.chartLumpsumConfig.yAxis = [{ //NOT WORKING
              title: {
                          text: '',
                          
                      },
                      gridLineWidth: 0,
                      labels: ''
         }]
         
      // console.log($scope.chartLumpsumConfig);
       }

      $scope.showSecondTab = function(){
        angular.element('[data-target="#tab2"]').tab('show');
        // $scope.chartMonthlyConfig.title.text = "Setting monthly title"; //Works 
        $scope.isMonthly = true;
        $scope.isLumpSum = false;
         $scope.chartMonthlyConfig.chart = [{renderTo: 'chart'}] ;
         $scope.chartMonthlyConfig.series = [ //Works
         {
            type: 'area',
            name: 'lumpsum',
            data: [[$scope.lumpsumAvailable],[$scope.totalFundRequired]],
            dashStyle: 'ShortDash',
            lineWidth: 3,
            color : '#DAE1FA',
              lineColor : '#D7E5FF',
              fillOpacity: 0.5,
              showInLegend: false,
              index:1,
           
          },
          {
            type: 'area',
            name: 'available',
            data: [[$scope.shortTotalFundAvailable],[$scope.totalFundAvailable]],
            lineWidth: 5,
            lineColor : '#c6884f',
              fillOpacity : .7,
              color : '#e2cbad',
              showInLegend: false,
              index:3
            
          },
          {
            type: 'area',
            name: 'additionalMonthly',
            data: [[$scope.shortTotalFundAvailable + $scope.additionalMonthlySavings ],[$scope.totalFundRequired]],
            lineWidth: 5,
            lineColor: '#8daebe',
            color : '#5bb1cd',
              fillOpacity: 0.3,
              showInLegend: false,
              shadow : 'false',
              index:2
            
          }
       ];
        
        //$(window).resize();
        
      
       }    
       $scope.animationFalse = function(){
         $scope.chartLumpsumConfig.plotOptions =[{series: {
                animation: false
            }}]
       }
       $scope.surplus = function(){
        if ($scope.totalFundAvailable > $scope.totalFundRequired){
              $scope.surplusChart = true;
              $scope.chartSurplusConfig.chart = [{renderTo: 'chart'}];
              $scope.chartSurplusConfig.series = [ //Works
              {
                  type: 'area',
                  name: 'lumpsum',
                  data: [$scope.initial, $scope.totalFundRequired],
                  lineWidth: 5,
                  lineColor : '#8daebe',
                  color: '#A0DCFA',
                  fillOpacity: 0.4,
                  showInLegend: false,
                  index:2 
              },
              {
                  type: 'area',
                  name: 'available',
                  data: [$scope.shortTotalFundAvailable,$scope.totalFundAvailable],
                  lineWidth: 5 ,
                  lineColor : '#75cf83',
                  color: '#93F88F',
                  fillOpacity: 0.4,
                  showInLegend: false,
                  index:1
              }
           ];
            $scope.chartLumpsumConfig.xAxis = [{ 
                categories: [ $scope.childName + ' at <strong>' + $scope.childAge +'</strong> yrs old', $scope.childName + ' at <strong>' + $scope.max +'</strong> yrs old'],
                gridLineWidth: 0,
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            }]
            $scope.chartLumpsumConfig.yAxis = [{ //NOT WORKING
                title: {
                            text: '',    
                        },
                gridLineWidth: 0,
                labels: ''
            }]
          }
       };

        $rootScope.model = $scope.model;
      //commonService.add($scope.model);
      function init(){
        $scope.showFirstTab();
        $scope.surplus();
      }
      init();
      $timeout(function(){
        $rootScope.graphData = $("#container").html();
      }, 1100);

      if ($location.path() === '/viewReport') {
        $("#reportPageGraph").html($scope.graphData);
        $("#reportPageGraph").children('#tab2').hide();
        $('.tooltip-highcharts').hide();
      };
   };

   ReportController.$inject = ['$scope','$rootScope','$location','limitToFilter','commonService','chart', '$timeout'];
   EduPlanner.controller("ReportController", ReportController);
 
 }());
