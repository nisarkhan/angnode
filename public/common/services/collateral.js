'use strict';
/* Residence Service */
angular
  .module('sunloan')
  .factory('$collaterals', function($resource, $response, $path) {

    var $collaterals = $resource($path.rest+'/rest/borrower/:account/collaterals');

    $collaterals.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'collaterals\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'collaterals\', $event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $collaterals;
});