'use strict';
/* Application Service */
angular
        .module('sunloan')
        .factory('$callroute', function ($resource, $response, $path) {

            var $callroute = $resource(
                    $path.rest + '/rest/callroute',
                    null,
                    {
                        all: {
                            method: 'GET',
                            isArray: true
                        },
                        assign: {
                            method: 'POST'
                        },
                        update: {
                            method: 'PUT'
                        }
                    });

            $callroute.$assigned = $resource(
                    $path.rest + '/rest/callroute/employee/:employee_id/current',
                    {employee_id: '@employee_id'},
            {
                get: {
                    method: 'GET',
                    isArray: true}
            });
            

            $callroute.prototype.$manage = function () {
                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="manage($event);"> <i class="fa fa-pencil"></i> Manage</a>' +
                        '</div>';
            };
            
            $callroute.prototype.$close = function () {
                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="close($event);"> <i class="fa fa-pencil"></i> Close</a>' +
                        '</div>';
            };

            return $callroute;
        });
