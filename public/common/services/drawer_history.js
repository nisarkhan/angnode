'use strict';
/* Drawer Service */
angular
        .module('sunloan')
        .factory('$history', function ($resource, $response, $path) {

            var $history = $resource($path.rest + '/rest/drawer/:drawer/history',
                    {drawer: '@drawer'},
            {
                'put': {method: 'PUT', isArray: false}
            });


            $history.current = $resource($path.rest + '/rest/drawer/:drawer/history/current');

            $history.cash = $resource(
                    $path.rest + '/rest/drawer/:drawer/history/:history/cash/:id',
                    {drawer: '@drawer', history: '@history', id: '@id'},
            {
                'get': {method: 'GET', isArray: true},
                'put': {method: 'PUT', isArray: false},
                'post': {method: 'POST', isArray: false}
            });

            $history.docs = $resource(
                    $path.rest + '/rest/drawer/:drawer/history/:history/doc/:id',
                    {drawer: '@drawer', history: '@history', id: '@id'},
            {
                'get': {method: 'GET', isArray: true},
                'put': {method: 'PUT', isArray: false},
                'post': {method: 'POST', isArray: false}
            });

            return $history;

        });