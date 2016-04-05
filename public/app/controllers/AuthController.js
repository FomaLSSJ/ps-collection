'use strict';

angular.module('app').controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$scope', '$state', '$http', '$cookies', 'login'];

function AuthCtrl($scope, $state, $http, $cookies, login) {
    if (login) {
        $state.go('home');
    }
    
    $scope.self = {
        state: $state.current.data.state
    }
    
    $scope.signup = function() {
        $http({
            method: 'POST',
            url: '/users/create',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({username: $scope.user.username, password: $scope.user.password})
        })
        .then(
            function(res) {
                var r = res.data.response;
                toastr.options = {'closeButton': true, 'timeOut': 0};
                
                if (res.data.status) {
                    toastr.success(r.message);
                } else {
                    toastr.error(r.message + r.errmsg);
                }
            },
            function(res) {
                console.log(res.data);
            }
        );
    }
    
    $scope.signin = function() {
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
                    
                    $cookies.putObject('_user_data', {id: res.data.user.id, username: res.data.user.username}, {expires: expireDate});
                    $scope.$parent.user = $cookies.getObject('_user_data');
                    $state.go('home');
                    toastr.success(r.message, 'Success');
                } else {
                    toastr.error(r.message, 'Error');
                }
            },
            function(res) {
                console.log(res);
            }
        )
    }
};