'use strict';

/* Chart of Accounts Service */
angular
        .module('sunloan')
        .factory('$chartofaccounts', function ($resource, $path) {
          return $resource($path.rest + '/rest/chart-of-accounts/:id');
        });
