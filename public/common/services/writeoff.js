'use strict';
/* Line Service */
angular
        .module('sunloan')
        .factory('$writeoff', function ($resource, $response, $path) {

            var $writeoff = $resource($path.rest + '/rest/delinquency/:action', null, {
                metrics: {
                    method: 'GET',
                    params: {action: 'metrics'},
                    isArray: true
                },
                recency: {
                    url: $path.rest + '/rest/delinquency/recency/:type',
                    method: 'GET',
                    isArray: true,
                    params: {type: '@type'}
                },
                writeoff: {
                    url: $path.rest + '/rest/borrower/:account/loan/:loan/writeoff',
                    method: 'PUT',
                    params: {account: '@account', loan: '@loan'}
                }
            });

            $writeoff.prototype.$manage = function () {
                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="manage($event);"> <i class="fa fa-pencil"></i> Manage</a>' +
                        '</div>';
            };

            $writeoff.prototype.$check = function () {
                return '<div class="checkbox"><input id="{{loan}}" type="checkbox" value="{{loan}}"/><label for=""></label></div>';
            };

            return $writeoff;

        });
