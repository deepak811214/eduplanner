(function(){ 
  "use strict";
  angular.module("EduPlanner").directive('tooltip',  function() {
        return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
            $(element).on('blur', function(){
                $(element).tooltip('hide');
                });
        }
    };
    });
  }());

