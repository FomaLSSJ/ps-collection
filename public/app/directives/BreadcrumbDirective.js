'use strict';

angular.module('app').directive('breadcrumb', breadcrumb);

breadcrumb.$inject = ['$rootScope'];

function breadcrumb($rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: '<div class="ui small breadcrumb" ng-repeat="item in obj">' +
                    '<a ng-if="item.url" ui-sref="{{item.url}}">{{ item.name }}</a>' +
                    '<div ng-if="!item.url" class="active section">{{ item.name }}</div>' +
                    '<i ng-if="item.divider" class="right angle icon divider"></i>' +
                    '</div>',
        link: function(scope, element, attrs) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                scope.obj = toState.data.breadcrumb;
            });
        }
    }
};