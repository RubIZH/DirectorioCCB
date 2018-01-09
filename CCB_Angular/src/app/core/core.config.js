(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config)
        .config(function ($httpProvider) {
        $httpProvider.interceptors.push([
          '$injector',
          function ($injector) {
            return $injector.get('AuthInterceptor');
          }
        ]);
      });

    /** @ngInject */
    function config($ariaProvider, $logProvider, msScrollConfigProvider, fuseConfigProvider, $mdDateLocaleProvider)
    {

        $mdDateLocaleProvider.shortDays = ['D', 'L', 'M', 'M', 'J', 'V','S'];

        $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct','Nov', 'Dic'];
        $mdDateLocaleProvider.days = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
        $mdDateLocaleProvider.shortDays = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

        $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD/MM/YYYY');
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        // Enable debug logging
        $logProvider.debugEnabled(true);

        /*eslint-disable */

        // ng-aria configuration
        $ariaProvider.config({
            tabindex: false
        });

        // Fuse theme configurations
        fuseConfigProvider.config({
            'disableCustomScrollbars'        : false,
            'disableCustomScrollbarsOnMobile': true,
            'disableMdInkRippleOnMobile'     : true
        });

        // msScroll configuration
        msScrollConfigProvider.config({
            wheelPropagation: true
        });

        /*eslint-enable */
    }
})();
