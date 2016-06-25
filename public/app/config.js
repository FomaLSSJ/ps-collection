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
                    displayName: 'Home'
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
                    displayName: 'Sign In'
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
                    displayName: 'Sign Up'
                },
                resolve: {
                    profile: ['AuthService', function(AuthService) {
                        return AuthService.getAuth();
                    }]
                }
            })
            .state('home.profiles', {
                id: 4,
                url:'^/profiles',
                views: {
                    'main@': {
                        templateUrl:'/partials/profiles',
                        controller:'UsersCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    displayName: 'Profiles'
                }
            })
            .state('home.profiles.profile', {
                id: 5,
                url:'^/profile/:id',
                views: {
                    'main@': {
                        templateUrl:'/partials/profile',
                        controller:'ProfileCtrl'
                    }
                },
                data: {
                    state:'show',
                    displayName: '{{ profileName }}'
                },
                resolve: {
                    profileName: ['HelperService', '$stateParams', function(HelperService, $stateParams) {
                        return HelperService.getUserName($stateParams.id)
                    }],
                    profile: ['AuthService', '$stateParams', function(AuthService, $stateParams) {
                        return AuthService.getAuth($stateParams.id);
                    }]
                }
            })
            .state('home.profiles.profile.edit', {
                id: 6,
                url:'^/profile/:id/edit',
                views: {
                    'main@': {
                        templateUrl:'/partials/profile',
                        controller:'ProfileCtrl'
                    }
                },
                data: {
                    state:'edit',
                    displayName: 'Edit'
                },
                resolve: {
                    profile: ['AuthService', '$stateParams', function(AuthService, $stateParams) {
                        return AuthService.getAuth($stateParams.id);
                    }]
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
                    displayName:'Game'
                }
            })
            .state('home.releases', {
                id: 8,
                url:'^/releases',
                views: {
                    'main@': {
                        templateUrl:'/partials/releases',
                        controller:'ReleasesCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    releasesAll: true,
                    displayName: 'Releases'
                }
            })
            .state('home.releases.platform', {
                id: 9,
                url:'^/platform/:platform',
                views: {
                    'main@': {
                        templateUrl:'/partials/releases',
                        controller:'PlatformCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    displayName: '{{ platformName }}'
                },
                resolve: {
                    platformName: ['HelperService', '$stateParams', function(HelperService, $stateParams) {
                        return HelperService.getPlatformName($stateParams.platform)
                    }]
                }
            })
            .state('home.releases.release', {
                id: 10,
                url:'^/release',
                views: {
                    'main@': {
                        templateUrl:'/partials/release',
                        controller:'ReleaseCtrl',
                        controllerAs:'vm'
                    }
                },
                data: {
                    displayName: 'Release'
                }
            });
        
        //$locationProvider.html5Mode({enabled:true, requireBase:false});
        $locationProvider.hashPrefix('!');
    }
})();