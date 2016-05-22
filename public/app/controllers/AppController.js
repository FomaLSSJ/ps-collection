(function() {
    'use strict';

    angular.module('app').controller('AppCtrl', AppCtrl);
    
    AppCtrl.$inject = ['$scope', '$http', '$cookies'];
    
    function AppCtrl($scope, $http, $cookies) {
        $scope.user = {};
        $scope.profile = {};
        activate();
        
        function activate() {
            //
        }
        
        var userData = $cookies.getObject('_user_data');
        if (userData) {
            $scope.user = userData;
        }
    };
})();