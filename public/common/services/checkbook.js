'use strict';
/* Line Service */
angular
        .module('sunloan')
        .factory('$checkbook', function ($resource, $filter, $path) {

            var $checkbook = $resource(
                    $path.rest + '/rest/checkbook/:id',
                    {id: '@id'}, {
                all: {
                    method: 'GET',
                    isArray: true
                },
                current: {
                    url: $path.rest + '/rest/checkbook/current',
                    method: 'GET',
                    isArray: true
                },
                post: {
                    url: $path.rest + '/rest/checkbook',
                    method: 'POST',
                    isArray: false
                },
                put: {
                    method: 'PUT',
                    isArray: false
                },
                accounts: {
                    url: $path.rest + '/rest/chart-of-accounts',
                    method: 'GET',
                    isArray: true
                }
            });

            return $checkbook;

        })
        .factory('$check', function ($resource, $filter, $path) {
            var $check = $resource(
                    $path.rest + '/rest/checkbook/:number/check/:check',
                    {number: '@number', check: '@check'},
            {
                get: {
                    method: 'GET',
                    isArray: true
                },
                post: {
                    method: 'POST'
                },
                put: {
                    method: 'PUT'
                },
                void:{
                    url: $path.rest + '/rest/checkbook/:number/check/:check/void',
                    method: 'PUT'
                }
            });


            $check.prototype.$options = function () {

                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="void($event)"> <i class="fa fa-pencil"></i>Void</a>' +
                        '</div>';
            }

            return $check;
        });