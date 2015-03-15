'use strict';
/* Writeoff Controller */

angular.module('sunloan')
  .controller('changepassword',
    function($scope, $routeParams, $timeout){

      $scope.create = function (login) {
          console.log('@changepassword', login);
      }

    
  });
