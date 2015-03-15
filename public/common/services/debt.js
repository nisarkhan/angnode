'use strict';
/* Debt Service */
angular
  .module('sunloan')
  .factory('$other_debts', function($resource, $response, $path) {

      var $other_debts = $resource($path.rest+'/rest/borrower/:account/other_debts');

      $other_debts.prototype.$options = function(){

        return '<div class="table-buttons">'+
                 '<a class="btn btn-white btn-sm" ng-click="open(\'other_debts\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
                 '<a class="btn btn-white btn-sm" ng-click="remove(\'other_debts\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
               '</div>';
      }

      return $other_debts;
  })
  .factory('$debts', function($resource, $response, $path) {

      var $debts = $resource($path.rest+'/rest/borrower/:account/debts');

      $debts.prototype.$options = function(){

        return '<div class="table-buttons">'+
                 '<a class="btn btn-white btn-sm" ng-click="open(\'debts\',$event)"> <i class="fa fa-pencil"></i> Edit</a>'+
                 '<a class="btn btn-white btn-sm" ng-click="remove(\'debts\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>'+
               '</div>';
      }

      return $debts;
  });