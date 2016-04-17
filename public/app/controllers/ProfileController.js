(function() {
    'use strict';

    angular.module('app').controller('ProfileCtrl', ProfileCtrl);
    
    ProfileCtrl.$inject = ['$rootScope', '$scope', '$http', '$cookies', '$state', '$stateParams', 'profile', 'HelperService'];
    
    function ProfileCtrl($rootScope, $scope, $http, $cookies, $state, $stateParams, profile, HelperService) {
        if (!profile) {
            $state.go('home');
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
        
        $scope.$watch('profile.id' , function() {
            if (!$scope.profile || !$cookies.getObject('_user_data')) {
                $scope.profile.self = false;
                return;
            }
            
            if ($scope.profile.id === $cookies.getObject('_user_data').id) {
                $scope.profile.self = true;
            } else {
                $scope.profile.self = false;
            }
            return;
        });
    };
})();