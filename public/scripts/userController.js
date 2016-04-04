(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('UserController', UserController);

    function UserController($http, $auth, $state, $rootScope) {

        var vm = this;

        vm.users;
        vm.error;

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get('/laravel-jwt/public/api/v1/authenticate').success(function(users) {
                vm.users = users;
            }).error(function(error) {
                vm.error = error;
            });
        }

        // We would normally put the logout method in the sam
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        vm.logout = function(){
            $auth.logout().then(function() {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;

                $state.go('/auth', {});
            });
        }
    }

})();