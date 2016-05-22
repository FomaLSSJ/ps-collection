(function() {
    'use strict';
    angular.module('app').controller('ReleaseCtrl', ReleaseCtrl);
    angular.module('app').controller('ReleasesCtrl', ReleasesCtrl);
    
    ReleaseCtrl.$inject = ['$http'];
    ReleasesCtrl.$inject = ['$state', '$http'];
    
    function ReleaseCtrl($http) {
        var vm = this;
        
        vm.release = {};
        vm.releaseCreate = releaseCreate;
        
        function releaseCreate() {
            $http({
                method: 'POST',
                url: '/releases/create',
                data: vm.release
            }).then(function(res) {
                console.log(res.data);
            });
        }
    }
    
    function ReleasesCtrl($state, $http) {
        var vm = this;
        
        vm.releases = [];
        
        $http({
            method: 'GET',
            url: '/releases/all/' + $state.params.platform + '/10'
        }).then(function(res) {
            vm.releases = res.data.releases;
        });
    }
})();