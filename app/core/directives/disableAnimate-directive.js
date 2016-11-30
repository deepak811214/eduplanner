(function(){ 
  //"use strict";
  angular.module("EduPlanner").directive("disableAnimate", function ($animate) {
    return function (scope, element) {
        $animate.enabled(false, element);
    };
});
  }());

