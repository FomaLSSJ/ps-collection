(function() {
    'use strict';

    angular.module('app').directive('uiPopup', uiPopup);
    
    function uiPopup() {
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
    };
})();