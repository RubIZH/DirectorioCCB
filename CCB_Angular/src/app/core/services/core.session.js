(function ()
{
    'use strict';

    angular
        .module('app.core')
        .service('Session', function () {

        this.create = function (username, accessToken, refreshToken,userRole) {
          this.username = username;

          this.accessToken = accessToken;
          this.refreshToken = refreshToken;
          this.userRole = userRole;
        };
        this.destroy = function () {
          this.username = null;
          this.accessToken = null;
          this.refreshToken = null;
          this.userRole = null;
        };
      })


})();
