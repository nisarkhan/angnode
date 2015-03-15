'use strict';
/* Dashboard Controller */

angular
  .module('sunloan')
  .controller('loan.rate', function($scope, $routeParams, $rootScope, $location, $storage, $loan, $application){

      $scope.application = $application.get({ method: $routeParams.id }, function(response){
        if(! 'id' in response) $location.path('application');
      });

      /* get rates list*/
      $loan.rate(function(rates){
        $scope.rates = rates;
      });

      $scope.select = function(data){
        $scope.rate = angular.copy(data);
        $storage.put('rate', $scope.rate);
      };

      $scope.continue = function(){

        if( $scope.rate ){
          $location.path("/loan/"+$scope.application.id+"/make");
        }else{
          $rootScope.alert("Please select a rate to continue.", "Continue");
        };

      };

  });
