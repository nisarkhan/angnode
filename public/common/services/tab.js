'use strict';
/* Debt Service */
angular
        .module('sunloan')
        .factory('$tabs', function ($resource, $response, $path) {

            var $tabs = $resource($path.rest + '/rest/borrower/:account/:page',
                    {account: '@account', page: '@page'},
            {
                put: {
                    url:'/rest/borrower/:account/:page/:num',
                    method: 'PUT'
                },
                delete:{
                    method: 'DELETE'
                },
                post:{
                    method: 'POST'
                },
                query:{
                    method: 'GET',
                    isArray: true
                }
                
                
            });

            return $tabs;
        });