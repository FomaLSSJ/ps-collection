(function() {
    'use strict';

    angular.module('app').directive('uiPopup', uiPopup);
    angular.module('app').directive('uiDropdown', uiDropdown);
    angular.module('app').directive('uiDropdownApi', uiDropdownApi);
    
    function uiPopup() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.popup({
                    inline: true,
                    position: 'bottom right',
                    on: 'click'
                });
            }
        };
    }
    
    function uiDropdown() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.dropdown({
                    maxSelections: 5
                });
            }
        };
    }
    
    function uiDropdownApi() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.dropdown({
                    apiSettings: {
                        url: '/games/find?q={query}&f=semantic'
                    }
                });
            }
        };
    }
})();