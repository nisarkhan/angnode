'use strict';
/* Line Service */
angular
  .module('sunloan')
  .factory('$line', function($resource, $filter, $path) {
    
    var $line = $resource(
        $path.rest + '/rest/glline/:id', 
        {}, {
          all: { 
            method: 'GET', 
            isArray: true,
            transformResponse: function(data, header){
              var collection = angular.fromJson(data);  
              return $filter('orderBy')(collection, 'name');
            }
          }
        });

    return $line;

});