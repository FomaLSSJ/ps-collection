(function() {
    'use strict';
    
    angular.module('app').controller('UsersCtrl', UsersCtrl);
    
    UsersCtrl.$inject = ['$http'];
    
    function UsersCtrl($http) {
        var vm = this;
        
        vm.users = [];
        
        $http({
            method: 'GET',
            url: '/users/all/10'
        }).then(function(res) {
            vm.users = res.data.users;
        });
    }
})();