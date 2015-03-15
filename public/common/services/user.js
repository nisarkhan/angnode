'use strict';
/* Employee Service */
angular
  .module('sunloan')
  .factory('$user', function($resource, $path) {
    
    return $resource($path.rest + '/rest/employee/active', {}, 
                {
                        logout : {
                          url : $path.rest + '/rest/user_management/logout',
                          method: 'GET'
                        }
                    });
});