'use strict';

angular.module('app').directive('breadcrumb', breadcrumb);

function breadcrumb() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="ui small breadcrumb">Breadcrumb</div>',
        link: function($rootScope, $scope, element, attrs) {
            function capFirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                console.log(toState);
                
                var breadcrumb = toState.name.split('.');
                var object = [];
                var prevUrl = '';
                for (var i, i = 0; i < breadcrumb.length; i++) {
                    var bc = breadcrumb.length - 1;
                    if (i === bc) {
                        prevUrl = prevUrl + breadcrumb[i];
                        object.push({name: capFirst(breadcrumb[i]), devider: false, url: prevUrl})
                    } else {
                        if (i === 0) {
                            prevUrl = breadcrumb[i];
                        } else {
                            prevUrl = prevUrl + '.' + breadcrumb[i];
                        }
                        object.push({name: capFirst(breadcrumb[i]), devider: true, url: prevUrl})
                    }
                }
                console.log(object);
            })
        }
    }
};