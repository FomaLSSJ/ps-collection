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
            },
            data: {
                breadcrumb: [
                    {name: 'Home', divider: false, url: false}
                ]
            }
        })
        .state('home.signin', {
            id: 2,
            url:'^/signin',
            views:{
                'main@':{
                    templateUrl:'/partials/sign',
                    controller:'AuthCtrl'
                }
            },
            data: {
                state:'in',
                breadcrumb: [
                    {name: 'Home', divider: true, url: 'home'},
                    {name: 'Sign In', divider: false, url: false}
                ]
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
            views:{
                'main@':{
                    templateUrl:'/partials/sign',
                    controller:'AuthCtrl'
                }
            },
            data: {
                state:'up',
                breadcrumb: [
                    {name: 'Home', divider: true, url: 'home'},
                    {name: 'Sign Up', divider: false, url: false}
                ]
            },
            resolve:{
                login: ['AuthService', function(AuthService) {
                    return AuthService.getAuth();
                }]
            }
        })
        .state('home.profile', {
            id: 4,
            url:'^/profile',
            views:{
                'main@':{
                    templateUrl:'/partials/profile',
                    controller:'ProfileCtrl'
                }
            },
            data:{
                breadcrumb: [
                    {name: 'Home', divider: true, url: 'home'},
                    {name: 'Profile', divider: false, url: false}
                ]
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