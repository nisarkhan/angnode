'use strict';
/* Report Controller */

angular.module('sunloan')
  .controller('report', 
    function($scope, $routeParams, $loan){

      $scope.$on("$viewContentLoaded", function(){

        console.log("@init: report");
      });


  });