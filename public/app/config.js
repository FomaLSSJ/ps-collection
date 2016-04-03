angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            id: 1,
            url:'/',
            views:{
                'main@':{
                    templateUrl:'/partials/main'
                }
            }
        })
        .state('home.signin', {
            id: 2,
            url:'^/signin',
            data: {state:'in'},
            views:{
                'main@':{
                    templateUrl:'/partials/sign',
                    controller:'AuthCtrl'
                }
            }
        })
        .state('home.signup', {
            id: 3,
            url:'^/signup',
            data: {state:'up'},
            views:{
                'main@':{
                    templateUrl:'/partials/sign',
                    controller:'AuthCtrl'
                }
            }
        })
    
    //$locationProvider.html5Mode({enabled:true, requireBase:false});
});