var app = angular.module('app', []);

app.controller('RegisterCtrl', function($scope, $http) {
    $scope.user = {};
    
    $scope.register = function() {
        $http({
            method:'POST',
            url:'/users',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:$.param({name:$scope.user.name})
        })
        .then(
            function(res) {
                console.log(res);
            },
            function(res) {
                console.log(res);
            }
        );
    }
});