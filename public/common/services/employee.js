'use strict';
angular
        .module('sunloan')
        .factory('$employee', function ($resource, $response, $path) {

            var $employee = $resource(
                    $path.rest + '/rest/employee/:id',
                    {id: '@id'},
            {
                'query': {method: 'GET', isArray: true}
            });

            $employee.prototype.$options = function () {

                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="open(\'employee\',$event)"> <i class="fa fa-pencil"></i> Edit</a>' +
                        '<a class="btn btn-white btn-sm" ng-click="remove(\'employee\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>' +
                        '</div>';
            }

            return $employee;
        });