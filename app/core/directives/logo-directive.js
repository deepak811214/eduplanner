(function(){ 
  "use strict";
  angular.module("EduPlanner").directive("logoDir",function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div><img ng-src="{{logoImageName}}" alt="DBS Education Planner" class="" /></div>',
       link: function(scope, iElement, iAttrs) {
      // get weather details
    }
    }
  });
  }());

