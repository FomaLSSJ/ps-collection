(function() {
    'use strict';
    angular.module('app').filter('type', type);
    angular.module('app').filter('region', region);
    
    type.$inject = [];
    region.$inject = [];
    
    function type() {
        return function(input) {
            switch (input) {
                case 'physical':
                    return 'Physical copy';
                case 'digital':
                    return 'Digital copy';
            }
        };
    }
    
    function region() {
        return function(input) {
            switch (input) {
                case 'eu':
                    return 'Europe';
                case 'us':
                    return 'USA';
                case 'jp':
                    return 'Japan';
                case 'as':
                    return 'Australia';
            }
        };
    }
})();