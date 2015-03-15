'use strict';
/* Phone Number Service */
angular
  .module('sunloan')
  .factory('$phone_number', function($resource, $response, $path) {

    var $phone_number = $resource();

    $phone_number.prototype.$options = function(){

      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="open(\'phonenumber\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
               '<a class="btn btn-white btn-sm" ng-click="remove(\'phonenumber\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
             '</div>';
    }

    return $phone_number;
});