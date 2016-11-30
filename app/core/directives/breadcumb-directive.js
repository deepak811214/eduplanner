(function(){ 
  "use strict";
  angular.module("EduPlanner").directive("breadcrumbDir",function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/core/html/breadcumb.html',
       link: function(scope, iElement, iAttrs) {
      // get weather details
    }
    }
  });
  }());