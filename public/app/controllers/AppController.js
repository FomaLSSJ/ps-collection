'use strict';

angular.module('app').controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http', '$cookies', '$state'];

function AppCtrl($scope, $http, $cookies, $state) {
    $scope.user = {};
    
    var userData = $cookies.getObject('_user_data');
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
                $cookies.remove('_user_data');
                $scope.user = {};
                toastr.success(res.data.response.message, 'Success');
            }
        })
    }
};