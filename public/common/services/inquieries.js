'use strict';
/* Phone Number Service */
angular
  .module('sunloan')
  .factory('$inquieries', function($resource, $response, $path) {

    var inquieries = $resource();

    inquieries.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'inquieries\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'inquieries\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return inquieries;
});