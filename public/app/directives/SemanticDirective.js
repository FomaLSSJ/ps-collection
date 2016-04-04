angular.module('app').directive('uiPopup', function() {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            element.popup({
                inline   : true,
                position: 'bottom right',
                on: 'click'
            });
        }
    }
});