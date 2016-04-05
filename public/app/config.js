'use strict';

angular.module('app').config(Config);

Config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function Config($stateProvider, $locationProvider, $urlRouterProvider) {
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
            },
            resolve:{
                login: ['AuthService', function(AuthService) {
                    return AuthService.getAuth();
                }]
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
            },
            resolve:{
                login: ['AuthService', function(AuthService) {
                    return AuthService.getAuth();
                }]
            }
        })
    
    //$locationProvider.html5Mode({enabled:true, requireBase:false});
    $locationProvider.hashPrefix('!')
};