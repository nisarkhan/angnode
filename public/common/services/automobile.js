'use strict';
/* Residence Service */
angular
  .module('sunloan')
  .factory('$automobiles', function($resource, $response, $path) {

    var $automobile = $resource($path.rest+'/rest/borrower/:account/automobiles');

    $automobile.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'automobiles\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'automobiles\', $event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $automobile;
});