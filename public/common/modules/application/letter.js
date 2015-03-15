'use strict';
/* Dashboard Controller */

angular
  .module('sunloan')
  .controller('application.letter', function($scope, $routeParams, $rootScope, $location, $storage, $application){

      $scope.application = $application.get({ method: $routeParams.id }, function(response){
        if(! 'id' in response) $location.path('application');
      });

      $scope.print = function(){
        alert("print");
      };

  });
