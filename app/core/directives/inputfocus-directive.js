(function(){ 
  "use strict";
  angular.module("EduPlanner").directive("input", function ($timeout) {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
            if (!ctrl) {
                return;
            }

            elm.on('focus', function (event) {
                if(elm.parent().hasClass('value'))
                {
                    elm.parents('.form-row').addClass('input-focus');
                }else
                {
                    elm.parent().addClass('input-focus');
                }
                elm.addClass('text-black');
                scope.$apply(function () {
                    ctrl.hasFocus = true;
                });
            });

            elm.on('blur', function () {
                elm.removeClass('has-focus');
                elm.addClass('has-visited');
                if(elm.parent().hasClass('value'))
                {
                    elm.parents('.form-row').removeClass('input-focus');
                }else
                {
                    elm.parent().removeClass('input-focus'); 
                }
                               
                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
            });

            elm.closest('form').on('submit', function () {
                elm.addClass('has-visited');

                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
            });

        }
    };

  });
  }());

