angular.module('app').controller('AppCtrl', function($scope, $http, $cookieStore) {
    $scope.user = {};
    
    var userData = $cookieStore.get('_user_data');
    if (userData) {
        $scope.user = userData;
    }
    
    $scope.logout = function(e) {
        e.preventDefault();
        
        $http({
            method: 'POST',
            url: '/users/logout'
        })
        .then(function(res) {
            if (res.data.status) {
                $cookieStore.remove('_user_data');
                $scope.user = {};
                toastr.success(res.data.response.message, 'Success');
            }
        })
    }
});