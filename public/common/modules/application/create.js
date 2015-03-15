'use strict';
/* Dashboard Controller */

angular
  .module('sunloan')
  .controller('application.create', function($scope, $routeParams, $location, $storage, $application) {

    //ui-select :::initialize:::
    $scope.ddl_ownership_type = {};
    $scope.ddl_source = {};
    $scope.ddl_identification_type = {};
    //ui-select :::clear the selected value:::
    $scope.clear = function($event, model) {
      //$event.stopPropagation();
      $scope.clearme(model); 
    };

    //end ui-select

    /* default data */
    $scope.application = 'id' in $routeParams ? $application.get({
      method: $routeParams.id
    }) : {};

    /* get dropdown data */
    $application.get({
      method: 'types'
    }, function(types) {
      $scope.dropdown = types;

      $scope.update_ui_select_dropdown();

      /* default identification type is ssn, assume it's our first element in the array */
      if (types.identification_types) {
        $scope.application.identification_type = types.identification_types[0].name;
      }

    });

    /* create application */
    $scope.create = function(application) {
      
      //grab the updated value (if any) from the ui-select dropdown
      var application = $scope.update_payload_data(application); 

      var data = angular.copy(application);

      if ('id' in $scope.application) {

        /* update current/storaged application */
        data.method = $scope.application.id;
        console.log("@update", data);
        $application.update(data, function(response, headers) {
          console.log("@application", response);
          $location.path('application/' + response.id + '/borrower');
        });
      } else {
        /* create new application*/
        $application.save(data, function(response, headers) {
          var id = headers('location').split('/').pop();
          $location.replace('application/' + id);
          $location.path('application/' + id + '/borrower');
        });
      }
    };

    $scope.reset = function() {
      window.location.reload();
    };

    $scope.clearme = function(model) {

      if (model === 'ownership_type') {
        $scope.ddl_ownership_type = undefined;
        $scope.ddl_ownership_type = {};
      } else if (model === 'source') {
        $scope.ddl_source = undefined;
        $scope.ddl_source = {}; 
      } else if (model === 'identification_number') {
        $scope.ddl_identification_type = undefined;
        $scope.ddl_identification_type = {};
      }
    }
    $scope.update_payload_data = function(data) {
      //ui-select :::new selected value assign to applicaiton before it saves new value:::
      data.ownership_type = $scope.ddl_ownership_type.selected.name;
      data.source = $scope.ddl_source.selected.name;
      data.identification_type = $scope.ddl_identification_type.selected.name;
      return data;
    }

    $scope.update_ui_select_dropdown = function() {
      //ui-select :::load selected value from db:::
      //ui-select :::load selected value from db:::
      if ($scope.application.ownership_type !== undefined)
        $scope.ddl_ownership_type.selected = {
          name: $scope.application.ownership_type
        };

      if ($scope.application.source !== undefined)
        $scope.ddl_source.selected = {
          name: $scope.application.source
        };
     if ($scope.application.identification_type !== undefined)
        $scope.ddl_identification_type.selected = {
          name: $scope.application.identification_type
        };
      //return data;
    }

  });