'use strict';

angular.module('app').controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$http', '$cookies', '$state', 'login'];

function ProfileCtrl($scope, $http, $cookies, $state, login) {
    if (!login) {
        $state.go('home');
    }
    
    $http({
        method: 'GET',
        url: '/users/get/' + $scope.$parent.user.id
    }).then(function(res) {
        $scope.$parent.user = res.data.user;
    });
    
};