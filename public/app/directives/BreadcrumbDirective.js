(function() {
    'use strict';

    angular.module('app').directive('breadcrumb', breadcrumb);
    
    breadcrumb.$inject = ['$rootScope', '$interpolate'];
    
    function breadcrumb($rootScope, $interpolate ) {
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            template: '<div class="ui small breadcrumb" ng-repeat="item in obj">' +
                        '<a ng-if="item.url" ui-sref="{{item.url}}">{{ item.name }}</a>' +
                        '<div ng-if="!item.url && !item.user" class="active section">{{ item.name }}</div>' +
                        '<div ng-if="!item.url && item.user" class="active section">{{ profile.username }}</div>' +
                        '<i ng-if="item.divider" class="right angle icon divider"></i>' +
                        '</div>',
            link: function(scope, element, attrs) {
                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    scope.obj = toState.data.breadcrumb;
                });
            }
        }
    };
})();