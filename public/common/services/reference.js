'use strict';
/* Residence Service */
angular
  .module('sunloan')
  .factory('$references', function($resource, $response, $path) {

    var $references = $resource('/rest/borrower/:account/references');

    $references.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'references\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'references\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $references;
});