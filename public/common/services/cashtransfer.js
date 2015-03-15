'use strict';

/* Cash transfer Service */
angular
        .module('sunloan')
        .factory('$cashtransfer', function ($resource, $path) {
          return $resource($path.rest + '/rest/cashtransfer/:id');
        });
