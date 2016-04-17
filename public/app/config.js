(function() {
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
                    profile: ['AuthService', function(AuthService) {
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
                    profile: ['AuthService', function(AuthService) {
                        return AuthService.getAuth();
                    }]
                }
            })
            .state('home.profile', {
                id: 4,
                url:'^/profile/:id',
                views:{
                    'main@':{
                        templateUrl:'/partials/profile',
                        controller:'ProfileCtrl'
                    }
                },
                data:{
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Users', divider: true, url: 'home.users'},
                        {name: '{{ profile.username }}', divider: false, url: false, user: true}
                    ]
                },
                resolve:{
                    profile: ['AuthService', '$stateParams', function(AuthService, $stateParams) {
                        return AuthService.getAuth($stateParams.id);
                    }]
                }
            })
            .state('home.users', {
                id: 5,
                url:'^/users',
                views:{
                    'main@':{
                        templateUrl:'/partials/users',
                        controller:'UsersCtrl'
                    }
                },
                data:{
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Users', divider: false, url: false}
                    ]
                }
            })
        
        //$locationProvider.html5Mode({enabled:true, requireBase:false});
        $locationProvider.hashPrefix('!')
    };
})();