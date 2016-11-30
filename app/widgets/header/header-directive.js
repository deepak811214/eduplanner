(function(){ 
  "use strict";
  angular.module("EduPlanner").directive("headerDir",function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: "app/widgets/header/header-template.html",
      controller:"HeaderController"
    }
  });
  }());