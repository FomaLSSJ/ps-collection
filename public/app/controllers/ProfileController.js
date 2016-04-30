(function() {
    'use strict';

    angular.module('app').controller('ProfileCtrl', ProfileCtrl);
    
    ProfileCtrl.$inject = ['$rootScope', '$scope', '$http', '$cookies', '$state', '$stateParams', 'profile', 'AuthService', 'HelperService'];
    
    function ProfileCtrl($rootScope, $scope, $http, $cookies, $state, $stateParams, profile, AuthService, HelperService) {
        if (!profile) {
            $state.go('home');
        }
        
        $scope.self = {
            state: $state.current.data.state
        }
        
        $scope.$parent.profile = profile.user;
        
        $scope.logout = function(e) {
            e.preventDefault();
            
            $http({
                method: 'POST',
                url: '/users/logout'
            })
            .then(function(res) {
                if (res.data.status) {
                    $cookies.remove('_user_data');
                    $scope.$parent.user = {};
                    toastr.success(res.data.response.message, 'Success');
                    $state.go('home.signin');
                }
            })
        }
        
        $scope.saveProfile = function() {
            $http({
                method: 'POST',
                url: '/users/edit/' + $scope.profile.id,
                data: {
                    psnid: $scope.profile.psnid,
                    info: $scope.profile.info
                }
            }).then(function(res) {
                if (res.data.status) {
                    AuthService.getAuth($scope.profile.id).then(function(res) {
                        $scope.profile.psnid = res.user.psnid;
                        $scope.profile.info = res.user.info;
                    });
                    toastr.success(res.data.response.message, res.data.response.name);
                    $state.go('home.profile', {id: $scope.profile.id});
                } else {
                   toastr.error(res.data.response.message, res.data.response.name);
                }
            });
        }
        
        $scope.$watch('profile.id' , function() {
            if (!$scope.profile || !$cookies.getObject('_user_data')) {
                $scope.profile.self = false;
            } else if ($scope.profile.id === $cookies.getObject('_user_data').id) {
                $scope.profile.self = true;
            } else {
                $scope.profile.self = false;
            }
            
            console.log('asd');
            
            if (!$scope.profile.self && $scope.self.state == 'edit' && ($scope.user != 'admin' || $scope.user != 'moder')) {
                toastr.warning('Hey, you... yes, YOU! Fuck off!', 'Error');
                $state.go('home');
            }
            
            return;
        });
    };
})();