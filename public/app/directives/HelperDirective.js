(function() {
    'use strict';
    angular.module('app').directive('ngUpdateHidden', ngUpdateHidden);
    angular.module('app').directive('ngPaginate', ngPaginate);
    
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
    
    function ngPaginate($timeout, $state) {
        return {
            restrict: 'E',
            templateUrl: '/partials/paginate',
            scope: {
                paginateData: '='
            },
            replace: true,
            link: function(scope, element, attrs, ngModel) {
                scope.$watch('paginateData', function() {
                    console.log(scope.paginateData);
                    
                    scope.prevPage = parseInt(scope.paginateData.page) - 1;
                    scope.nextPage = parseInt(scope.paginateData.page) + 1;
                    scope.lastPage = parseInt(scope.paginateData.total);
                });
                
                scope.goBack = function() {
                    if (!$(element).find('[name=prev]').hasClass('disabled')) {
                        $state.go($state.$current.name, { page: scope.prevPage });
                    }
                }
                
                scope.goNext = function() {
                    if (!$(element).find('[name=next]').hasClass('disabled')) {
                        $state.go($state.$current.name, { page: scope.nextPage });
                    }
                }
                
                scope.changePage = function(page) {
                    $state.go($state.$current.name, { page: page });
                }
                
                /*
                ngModel.$render = function() {
                    var newValue = ngModel.$viewValue;
                    console.log(newValue);
                };
                */
                
                /*
                scope.state = $state.$current.url.prefix;
                console.log(scope.state);
                
                scope.goToPage = function(page) {
                    scope.prev = parseInt(page) - 1;
                    scope.next = parseInt(page) + 1;
                    
                    $state.go($state.$current.name, { page: page });
                }
                
                $timeout(function() {
                    scope.prev = parseInt(scope.page) - 1;
                    scope.next = parseInt(scope.page) + 1;
                }, 500);
                */
            }
        };
    }
})();