(function() {
    angular.module('app').service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$cookies'];
    
    function AuthService($http, $cookies, $state) {
        this.getAuth = function(id) {
            if (!id) {
                return false;
            }
            
            var result = $http.get('/users/get/' + id)
                .then(function(res) {
                    return res.data;
                });
                
            return result;
        }
    }
})();