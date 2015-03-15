'use strict';
/* Phone Number Service */
angular
  .module('sunloan')
  .factory('$phones', function($resource, $response, $path) {

    var $phones = $resource();

    $phones.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'phones\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'phones\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $phones;
});