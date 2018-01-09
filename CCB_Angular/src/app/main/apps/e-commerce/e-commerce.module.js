(function ()
{
    'use strict';

    angular
        .module('app.e-commerce',
            [
                // 3rd Party Dependencies
                'wipImageZoom',
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, USER_ROLES)
    {
        // State
        $stateProvider
            .state('app.e-commerce', {
                abstract: true,
                url     : '/directory',
                data: {
                  authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }

            })
            .state('app.e-commerce.dashboard', {
                url      : '/dashboard',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/dashboard/dashboard.html',
                        controller : 'DashboardEcommerceController as vm'
                    }
                },
                resolve  : {
                    Dashboard: function (msApi)
                    {
                        return msApi.resolve('e-commerce.dashboard@get');
                    }
                },
                bodyClass: 'ecommerce'
            })
            .state('app.e-commerce.products', {
                url      : '/registros',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/products/products.html',
                        controller : 'ProductsController as vm'
                    }
                },
                resolve  : {
                    Products: function (eCommerceService)
                    {
                        return eCommerceService.getProducts();
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.products.add', {
                url      : '/add',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve: {
                    Product: function (eCommerceService)
                    {
                        return eCommerceService.newProduct();
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.products.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve  : {
                    Product: function ($stateParams, Products, eCommerceService)
                    {
                        return eCommerceService.getProduct($stateParams.id);
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.orders', {
                url      : '/orders',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/orders/orders.html',
                        controller : 'OrdersController as vm'
                    }
                },
                resolve  : {
                    Orders: function (eCommerceService)
                    {
                        return eCommerceService.getOrders();
                    }
                },
                bodyClass: 'e-commerce'
            })
            .state('app.e-commerce.orders.detail', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/e-commerce/views/order/order.html',
                        controller : 'OrderController as vm'
                    }
                },
                resolve  : {
                    Order        : function ($stateParams, Orders, eCommerceService)
                    {
                        return eCommerceService.getOrder($stateParams.id);
                    },
                    OrderStatuses: function (eCommerceService)
                    {
                        return eCommerceService.getOrderStatuses();
                    }
                },
                bodyClass: 'e-commerce'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/e-commerce');

        // Api

        msApiProvider.register('e-commerce.products', ['http://localhost:8080/allTodos']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.e-commerce', {
            title : 'E-Commerce',
            icon  : 'icon-cart',
            weight: 3
        });


        msNavigationServiceProvider.saveItem('apps.e-commerce.products', {
            title: 'Products',
            state: 'app.e-commerce.products'
        });


    }
})();
