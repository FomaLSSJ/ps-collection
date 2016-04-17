(function() {
    'use strict';
    
    angular.module('app').directive('gravatarImg', GravatarDirective);
    
    GravatarDirective.$inject = ['HelperService'];
    
    function GravatarDirective(HelperService) {
        return {
            restrict: 'AE',
            replace: true,
            required: 'email',
            template: '<img class="ui image" ng-src="{{ url }}"/>',
            link: function (scope, element, attrs) {
                scope.url = 'assets/images/image.png';
                
                attrs.$observe('email', function(value) {
                    if(!value) {
                        return;
                    }
                    
                    var hash = HelperService.md5func(value.toLowerCase());
                    var size = attrs.size;
                    
                    if(angular.isUndefined(size)) {
                      size = 160;
                    }
                    
                    scope.url = 'https://www.gravatar.com/avatar/' + hash + '?s=' + size + '&d=identicon';
              });
            }
        }
    }
})();