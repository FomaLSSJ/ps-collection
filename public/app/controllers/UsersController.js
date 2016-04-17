(function() {
    'use strict';
    
    angular.module('app').controller('UsersCtrl', UsersCtrl);
    
    UsersCtrl.$inject = ['$scope', '$http'];
    
    function UsersCtrl($scope, $http) {
        $scope.users = [];
        
        $http({
            method: 'GET',
            url: '/users/all/10'
        }).then(function(res) {
            $scope.users = res.data.users;
        });
    }
})();