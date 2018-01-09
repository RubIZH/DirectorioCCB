(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController( $scope,$rootScope, AUTH_EVENTS, AuthService,$location)
    {
        // Data
        var vm = this;

        $scope.credentials = {
          username: '',
          password: ''
        };

        $scope.login = function (credentials) {
         AuthService.login(credentials).then(function (user) {
           $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
           $scope.setCurrentUser(user);
           $location.path("/directory/registros");

         }, function () {
           $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
         });
       };




        // Methods

        //////////
    }
})();
