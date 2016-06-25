(function() {
    'use strict';
    angular.module('app').controller('ReleaseCtrl', ReleaseCtrl);
    angular.module('app').controller('ReleasesCtrl', ReleasesCtrl);
    angular.module('app').controller('PlatformCtrl', PlatformCtrl);
    
    ReleaseCtrl.$inject = ['$http'];
    ReleasesCtrl.$inject = ['$scope', '$state', '$http'];
    PlatformCtrl.$inject = ['$scope', '$stateParams', '$http'];
    
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
    
    function ReleasesCtrl($scope, $state, $http) {
        var vm = this;
        
        $scope.root.releasesAll = $state.current.data.releasesAll;
        vm.releases = [];
        
        $http({
            method: 'GET',
            url: '/releases/all/10'
        }).then(function(res) {
            vm.releases = res.data.releases;
        });
    }
    
    function PlatformCtrl($scope, $stateParams, $http) {
        var vm = this;
        
        $scope.root.releasesAll = false;
        $scope.root.platform = $stateParams.platform;
        vm.releases = [];
        
        $http({
            method: 'GET',
            url: '/releases/' + $stateParams.platform + '/10'
        }).then(function(res) {
            vm.releases = res.data.releases;
        });
    }
})();