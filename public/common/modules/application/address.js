'use strict';
/* Dashboard Controller */

angular
    .module('sunloan')
    .controller('application.address',
        function($scope, $routeParams, $location, $storage, $application) {

            //ui-select :::initialize:::
            $scope.ddl_state = {};
            $scope.ddl_how_long = {};
            $scope.ddl_res_type = {};
            $scope.ddl_ownership_type = {};
            //$scope.ddl_year_moved_in = {};

            //ui-select :::clear the selected value:::
            $scope.clear = function($event, model) {
                //$event.stopPropagation();
                $scope.clearme(model);
            };

            $scope.application = {};
            $scope.residences = [];
            $scope.page = 3;
            $scope.residence = {};


            /* default data */
            $scope.application = $application.get({
                    method: $routeParams.id,
                    page: $scope.page
                },
                function(response) {
                    if (!'id' in response) {
                        $location.path('application');
                    }
                    $scope.residence = $scope.application['residences'] ? $scope.application['residences'][0] : {};
                    $scope.update_ui_select_dropdown();
                });

            $scope.create = function(address) {

                //grab the updated value (if any) from the ui-select dropdown
                var newData = $scope.update_payload_data(address);

                $scope.residences.push(newData);
                $scope.application['residences'] = $scope.residences;

                $application
                    .update({
                        method: $scope.application.id
                    }, $scope.application, function(response, headers) {
                        $location.path('application/' + response.id + '/options');
                    });
            };

            /* get dropdown data */
            $application.get({
                method: 'types'
            }, function(types) {
                $scope.dropdown = types;

            });

            $scope.exit = function() {
                var data = angular.copy($scope.application);
                data.page = 2;
                data.method = $scope.application.id;

                //grab the updated value (if any) from the ui-select dropdown
                var newData = $scope.update_payload_data(data);

                $application
                    .update(newData, function(response, headers) {
                        $location.path('/');
                    });
            };


            $scope.clearme = function(model) {

                if (model === 'state') {
                    $scope.ddl_state = undefined;
                    $scope.ddl_state = {};
                } else if (model === 'how_long') {
                    $scope.ddl_how_long = undefined;
                    $scope.ddl_how_long = {};
                } else if (model === 'ddl_number_of_dependents') {
                    $scope.ddl_number_of_dependents = undefined;
                    $scope.ddl_number_of_dependents = {};
                } else if (model === 'res_type') {
                    $scope.ddl_res_type = undefined;
                    $scope.ddl_res_type = {};
                } else if (model === 'ownership') {
                    $scope.ddl_ownership_type = undefined;
                    $scope.ddl_ownership_type = {};
                }
            }
            $scope.update_payload_data = function(address) {
                //ui-select :::new selected value assign to applicaiton before it saves new value:::
                if ($scope.ddl_state.selected !== undefined)
                    address.state = $scope.ddl_state.selected.name;
                if ($scope.ddl_how_long.selected !== undefined)
                    address.how_long = $scope.ddl_how_long.selected.name;
                if ($scope.ddl_res_type.selected !== undefined)
                    address.type = $scope.ddl_res_type.selected.name;
                if ($scope.ddl_ownership_type.selected !== undefined)
                    address.ownership_type = $scope.ddl_ownership_type.selected.name;
                return address;
            }

            $scope.update_ui_select_dropdown = function() {
                //ui-select :::load selected value from db:::
                if ($scope.residence !== undefined) {
                    if ($scope.residence.state !== undefined)
                        $scope.ddl_state.selected = {
                            name: $scope.residence.state
                        };
                    if ($scope.residence.how_long !== undefined)
                        $scope.ddl_how_long.selected = {
                            name: $scope.residence.how_long
                        };
                    if ($scope.residence.type !== undefined)
                        $scope.ddl_res_type.selected = {
                            name: $scope.residence.type
                        };
                    if ($scope.residence.ownership_type !== undefined)
                        $scope.ddl_ownership_type.selected = {
                            name: $scope.residence.ownership_type
                        };
                    //return data;
                }
            }
        });