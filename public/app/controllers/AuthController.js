angular.module('app').controller('AuthCtrl', function($scope, $state, $http) {
    $scope.self = {
        state: $state.current.data.state
    }
    
    $scope.user = {};
    
    $scope.signup = function() {
        $http({
            method:'POST',
            url:'/users/create',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:$.param({username: $scope.user.username, password: $scope.user.password})
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
            method:'POST',
            url:'/users/login',
            params:$scope.user
        })
        .then(
            function(res) {
                var r = res.data.response;
                toastr.options = {'closeButton': true, 'timeOut': 0};
                
                if (res.data.status) {
                    toastr.success(r.message);
                } else {
                    toastr.error(r.message);
                }
            },
            function(res) {
                console.log(res);
            }
        )
    }
});