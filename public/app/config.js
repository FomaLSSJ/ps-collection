(function() {
    'use strict';
    
    toastr.options = {
        'closeButton': true,
        'timeOut': 5000,
        'progressBar': true
    };
    
    angular.module('app').config(Config);
    
    Config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    
    function Config($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                id: 1,
                url:'/',
                views: {
                    'main@': {
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
                views: {
                    'main@': {
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
                resolve: {
                    profile: ['AuthService', function(AuthService) {
                        return AuthService.getAuth();
                    }]
                }
            })
            .state('home.signup', {
                id: 3,
                url:'^/signup',
                views: {
                    'main@': {
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
                resolve: {
                    profile: ['AuthService', function(AuthService) {
                        return AuthService.getAuth();
                    }]
                }
            })
            .state('home.profile', {
                id: 4,
                url:'^/profile/:id',
                views: {
                    'main@': {
                        templateUrl:'/partials/profile',
                        controller:'ProfileCtrl'
                    }
                },
                data: {
                    state:'show',
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Users', divider: true, url: 'home.users'},
                        {name: '{{ profile.username }}', divider: false, url: false, user: true}
                    ]
                },
                resolve: {
                    profile: ['AuthService', '$stateParams', function(AuthService, $stateParams) {
                        return AuthService.getAuth($stateParams.id);
                    }]
                }
            })
            .state('home.profile.edit', {
                id: 5,
                url:'^/profile/:id/edit',
                views: {
                    'main@': {
                        templateUrl:'/partials/profile',
                        controller:'ProfileCtrl'
                    }
                },
                data: {
                    state:'edit',
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Users', divider: true, url: 'home.users'},
                        {name: '{{ profile.username }}', divider: true, url: 'home.profile({ id:profile.id })', user: true},
                        {name: 'Edit', divider: false, url: false}
                    ]
                },
                resolve: {
                    profile: ['AuthService', '$stateParams', function(AuthService, $stateParams) {
                        return AuthService.getAuth($stateParams.id);
                    }]
                }
            })
            .state('home.users', {
                id: 6,
                url:'^/users',
                views: {
                    'main@': {
                        templateUrl:'/partials/users',
                        controller:'UsersCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Users', divider: false, url: false}
                    ]
                }
            })
            .state('home.game', {
                id: 7,
                url:'^/game',
                views: {
                    'main@': {
                        templateUrl:'/partials/game',
                        controller:'GameCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Game', divider: true, url: false},
                        {name: 'Add', divider: false, url: false}
                    ]
                }
            })
            .state('home.release', {
                id: 8,
                url:'^/release',
                views: {
                    'main@': {
                        templateUrl:'/partials/release',
                        controller:'ReleaseCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Release', divider: true, url: false},
                        {name: 'Add', divider: false, url: false}
                    ]
                }
            })
            .state('home.releases', {
                id: 9,
                url:'^/releases/:platform',
                views: {
                    'main@': {
                        templateUrl:'/partials/releases',
                        controller:'ReleasesCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    breadcrumb: [
                        {name: 'Home', divider: true, url: 'home'},
                        {name: 'Releases', divider: false, url: false},
                    ]
                }
            });
        
        //$locationProvider.html5Mode({enabled:true, requireBase:false});
        $locationProvider.hashPrefix('!');
    }
})();