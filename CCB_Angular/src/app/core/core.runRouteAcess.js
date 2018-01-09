(function ()
{
    'use strict';

    angular
        .module('app.core')
        .run(function ($rootScope, AUTH_EVENTS, AuthService,$location) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
          var authorizedRoles = next.data.authorizedRoles;
          if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
              // user is not allowed


              $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);

            } else {
              
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

            }
          }
        });
      })

})();
