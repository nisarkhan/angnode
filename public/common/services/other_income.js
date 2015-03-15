'use strict';
/* Phone Number Service */
angular
  .module('sunloan')
  .factory('$other_incomes', function($resource, $response, $path) {

    var $other_incomes = $resource();

    $other_incomes.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'other_incomes\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'other_incomes\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $other_incomes;
});