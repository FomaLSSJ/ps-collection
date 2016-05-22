(function() {
    'use strict';
    angular.module('app').directive('ngUpdateHidden', ngUpdateHidden);
    
    function ngUpdateHidden() {
        return {
            restrict: 'AE',
            scope: {},
            replace: true,
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                scope.$watch(ngModel, function(nv) {
                    element.val(nv);
                });
                element.change(function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(element.val());
                    });
                });
            }
        };
    }
})();