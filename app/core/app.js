  /**
 * Main app for Education Planner
 * @author ashutosh
 */
   
var EduPlanner = angular.module("EduPlanner",['ngRoute','nouislider','highcharts-ng','ngCookies','fcsa-number','ngAnimate']);
EduPlanner.run(function($rootScope) {
 $rootScope.model = {"name" : "","additionalLumpSum": 0,"additionalMonthlySavings": 0,"cash": 0,"cashRor": 0.2,"childAge": 1, "max":21, "childName": "","country": "SG","gender": "Male","globalAdditionalLumpSum": 0,"globalAdditionalMonthlySavings": 0,"globalPeriod": 16,"globalShortFallSurplus": 0,"globalTotalFundAvailable": 0,"globalTotalFundRequired": 0,"globalWeightedROR": 0.026,"insuranceCash": 0,"insuranceRor": 5,"lumpsumAvailable": 0,"lumpsumpCash": 0,"newAdditionalLumpSum": 0,"newAdditionalMonthlySavings": 0,"oldAdditionalLumpSum": 0,"oldAdditionalMonthlySavings": 0,"period": 16,"shortTotalFundAvailable": 0,"shortfallSurplus": 0,"totalFundAvailable": 0,"totalFundRequired": 0,"weightedAnnualROR": 0.026};
    
})

EduPlanner.run(function ($rootScope, $location) {

      //animation
      $rootScope.animate = '';
      $rootScope.back = function (page) {
          $location.path('/'+ page);  
          $rootScope.animate = 'rightAnimation';
      }
      $rootScope.next = function (page) {  
        $location.path('/'+ page);    
        $rootScope.animate = 'leftAnimation';
      }

      $rootScope.pageUp = function (page) {   
        $location.path('/'+ page);  
        $rootScope.animate = 'page-animate-up';   
      } 


  $rootScope.$on("$locationChangeStart", function (event, next, current) {
      $rootScope.path = $location.path();

      $rootScope.isActiveOne = function () {

          for (var index = 0; index < arguments.length; index++) {
              if (arguments[index] === $location.path()) {
                  return true;
              }
          }
          return false;
      }  
      if(next==current && next.indexOf("home") < 0 && next.indexOf("#") > 0){
          $rootScope.isRefreshed=true;
          $location.path('/'+ "");   
      }
  });
  $rootScope.isActive = function(route) {
      return route === $location.path();
  }


  //function to redirect appointment button to respective webpages
  $rootScope.appointmentURL="";
  $rootScope.logoImageName="app/theme/images/logo.png";
  $rootScope.getAppointmentURL=function() {
      var currentUrl =location.href;
      if(currentUrl.indexOf('private-banking') != -1){
          $rootScope.appointmentURL = "https://www.dbs.com.sg/private-banking/dbs-forms/eappointment-wealth.page";
      } else if(currentUrl.indexOf('posb') != -1){
          $rootScope.appointmentURL =     "https://www.posb.com.sg/Contact/posb/insurance/retirement-appt/default.page?pid=sg-posb-pweb-retirement-planner-btnmakeappt";
          if($rootScope.appointmentURL.indexOf('posb')> -1){
              $rootScope.logoImageName="app/theme/images/posb.png";
              }
      } else if(currentUrl.indexOf('treasures-private-client') != -1){
          $rootScope.appointmentURL = "https://www.dbs.com.sg/treasures-private-client/dbs-forms/eappointment-wealth.page";
      } else if(currentUrl.indexOf('treasures') != -1){
          $rootScope.appointmentURL = "https://www.dbs.com.sg/treasures/dbs-forms/eappointment-wealth.page";
      } else {
          $rootScope.appointmentURL = "https://www.dbs.com.sg/Contact/dbs/insurance/retirement-appt/default.page?pid=sg-dbs-pweb-retirement-planner-btnmakeappt";
      }
  }
  $rootScope.getAppointmentURL();
});

//App Router
EduPlanner.config(['$routeProvider', '$locationProvider', '$sceProvider',function($routeProvider, $locationProvider, $sceProvider) {
  $routeProvider
  .when('/home', {
      templateUrl: 'app/widgets/header/header-template.html',
      controller: 'HeaderController'
  }).when('/actNow', {
      templateUrl: 'app/pages/actNow/actNow.html',
      controller: 'ActNowController'
  }).when('/edit', {
      templateUrl: 'app/pages/edit/edit.html',
      controller: 'EditController'
  }).when('/educationTarget', {
      templateUrl: 'app/pages/educationTarget/educationTarget.html',
      controller: 'EducationTargetController'
  }).when('/report', {
      templateUrl: 'app/pages/report/report.html',
      controller: 'ReportController'
  }).when('/sourceofFunds', {
      templateUrl: 'app/pages/sourceofFunds/sourcesofFunds.html',
      controller: 'SourceofFundsController'
  }).when('/personalDetails', {
      templateUrl: 'app/pages/personalDetails/personalDetails.html',
      controller: 'PersonalDetailsController'
  }).when('/thankyou', {
      templateUrl: 'app/pages/thankyou.html'
  }).when('/viewReport', {
      templateUrl: 'app/pages/viewReport/pdf.html',
       controller: 'ReportController'
  }).otherwise({
      redirectTo: '/home'
  });

      $locationProvider.baseHref = "/home/";
  
}]);



