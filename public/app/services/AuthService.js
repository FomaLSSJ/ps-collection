angular.module('app').service('AuthService', AuthService);

AuthService.$inject = ['$http', '$cookies'];

function AuthService($http, $cookies) {
    this.getAuth = function() {
        if ($cookies.getObject('_user_data')) {
            return true;
        } else {
            return false;
        }
    }
}