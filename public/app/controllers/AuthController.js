angular.module('app').controller('AuthCtrl', function($scope, $state, $http, $cookieStore) {
    var cookie = $cookieStore.get('_user_data');
    if (cookie) {
        $http.get('/users/find/' + cookie.id)
        .then(function(res) {
            if (res.data.status) {
                $state.go('home');
            }
        });
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
                    $cookieStore.put('_user_data', {id: res.data.user.id, username: res.data.user.username});
                    $scope.$parent.user = $cookieStore.get('_user_data');
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
});