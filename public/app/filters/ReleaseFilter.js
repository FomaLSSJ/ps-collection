(function() {
    'use strict';
    angular.module('app').filter('type', type);
    angular.module('app').filter('region', region);
    angular.module('app').filter('platform', platform);
    
    type.$inject = [];
    region.$inject = [];
    platform.$inject = [];
    
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
    
    function platform() {
        return function(input) {
            var ps = 'PlayStation';
            switch (input) {
                case 'ps3':
                    return ps + ' 3';
                case 'ps4':
                    return ps + ' 4';
            }
        }
    }
})();