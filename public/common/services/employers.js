'use strict';
/* Residence Service */
angular
        .module('sunloan')
        .factory('$employers', function ($resource, $response, $path) {

            var $employers = $resource('/rest/borrower/:account/employers');

            $employers.prototype.$options = function () {

                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="open(\'employers\',$event)"> <i class="fa fa-pencil"></i> Edit</a>' +
                        '<a class="btn btn-white btn-sm" ng-click="remove(\'employers\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>' +
                        '</div>';
            }

            return $employers;
        });