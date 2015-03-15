'use strict';
/* Residence Service */
angular
  .module('sunloan')
  .factory('$residence', function($resource, $response, $path) {

    var $residence = $resource($path.rest+'/rest/borrower/:account/residences');

    $residence.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'residences\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'residences\', $event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $residence;
});