(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('AuthService', function ($http, Session) {
          var authService = {};

          authService.login = function (credentials) {
            return $http.post('http://localhost:8080/api/login', {
            username: credentials.username,
            password: credentials.password
          }) .then(function (response) {
                Session.create(response.data.username,
                               response.data.access_token,
                               response.data.refresh_token,
                               response.data.roles[0])

                return response.data.username;
              });

          };

          authService.isAuthenticated = function () {

            return !! Session.username;
          };

          authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
              authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
              authorizedRoles.indexOf(Session.userRole) !== -1);
          };

          return authService;
    })
    .factory('AuthInterceptor', function ($rootScope, $q,
                                      AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.factory('AuthResolver', function ($q, $rootScope, $state) {
  return {
    resolve: function () {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('user-login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }
  };
})
.factory('TokenInterceptor', function ($rootScope, $window,Session) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if (Session.accessToken ) {
                    config.headers.Authorization = 'Bearer ' + Session.accessToken ;
                }
                return config;
            }
        };
    })


})();
