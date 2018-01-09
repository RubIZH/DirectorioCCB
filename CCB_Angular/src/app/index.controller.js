(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming, $scope,USER_ROLES,AuthService)
    {

      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      $scope.isAuthorized = AuthService.isAuthorized;

      $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
      };

      var vm = this;

        // Data
      vm.themes = fuseTheming.themes;



        //////////
    }
})();
