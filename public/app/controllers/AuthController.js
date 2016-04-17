(function() {
    'use strict';

    angular.module('app').controller('AuthCtrl', AuthCtrl);
    
    AuthCtrl.$inject = ['$scope', '$state', '$http', '$cookies', 'profile'];
    
    function AuthCtrl($scope, $state, $http, $cookies, profile) {
        if (profile) {
            $state.go('home');
        }
        
        $scope.self = {
            state: $state.current.data.state
        }
        
        $scope.signup = function() {
            $scope.self.loading = true;
            
            $http({
                method: 'POST',
                url: '/users/create',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param({username: $scope.user.username, password: $scope.user.password})
            })
            .then(
                function(res) {
                    var r = res.data.response;
                    toastr.options = {
                        'closeButton': true,
                        'timeOut': 5000,
                        'progressBar': true
                    };
                    
                    if (res.data.status) {
                        toastr.success(r.message);
                        $scope.self.loading = false;
                    } else {
                        toastr.error(r.message + ' ' + r.errmsg);
                        $scope.self.loading = false;
                    }
                },
                function(res) {
                    console.log(res.data);
                }
            );
        }
        
        $scope.signin = function() {
            $scope.self.loading = true;
            
            $http({
                method: 'POST',
                url: '/users/login',
                params: $scope.user
            })
            .then(
                function(res) {
                    var r = res.data.response;
                    toastr.options = {'closeButton': true, 'timeOut': 0};
                    
                    if (res.data.status) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        
                        $cookies.putObject('_user_data', {
                            id: res.data.user.id,
                            username: res.data.user.username,
                            role: res.data.user.role
                        }, {expires: expireDate});
                        $scope.$parent.user = $cookies.getObject('_user_data');
                        $state.go('home');
                        toastr.success(r.message, 'Success');
                        $scope.self.loading = false;
                    } else {
                        toastr.error(r.message, 'Error');
                        $scope.self.loading = false;
                    }
                },
                function(res) {
                    console.log(res.data);
                }
            )
        }
    };
})();