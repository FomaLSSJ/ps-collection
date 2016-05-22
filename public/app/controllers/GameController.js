(function() {
    'use strict';
    
    angular.module('app').controller('GameCtrl', GameCtrl);
    
    GameCtrl.$inject = ['$scope', '$http', '$q', 'HelperService'];
    
    function GameCtrl($scope, $http, $q, HelperService) {
        var vm = this;
        
        vm.game = {};
        
        vm.gameCreate = gameCreate;
        vm.gameReset = gameReset;
        
        function gameCreate() {
            $http({
                method: 'POST',
                url: '/games/create',
                data: vm.game
            }).then(function(res) {
                if (res.data.status) {
                    vm.gameReset();
                    toastr.success('Game create', 'Model');
                } else {
                    toastr.error(res.data.error.message, 'Error');
                }
            });
        }
        
        function gameReset() {
            vm.game = {};
        }
    }
})();