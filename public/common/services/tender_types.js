'use strict';
/* Tender type Service */
angular
        .module('sunloan')
        .factory('$tender_types', function ($resource, $path) {
          return $resource($path.rest + '/rest/drawer/types/tender/:id');
        });