'use strict';
/* Dashboard Controller */

angular
        .module('sunloan')
        .controller('application.borrower', function ($scope, $routeParams, $location, $storage, $application) {

            //ui-select :::initialize:::
            $scope.ddl_prefix = {};
            $scope.ddl_suffix = {};
            $scope.ddl_phone_type = {};
            
            //ui-select :::clear the selected value:::
            $scope.clear = function ($event, model) {
              //$event.stopPropagation();
              $scope.clearme(model);              
            };
      
      
            /* default data */
            $scope.application = $application.get({method: $routeParams.id}, function (response) {
                if (!'id' in response)
                    $location.path('application');
            });

            $scope.create = function () {

                var data = angular.copy($scope.application);  
                data.page = 2;
                data.method = $scope.application.id;
                
                //grab the updated value (if any) from the ui-select dropdown
                var newData = $scope.update_payload_data(data); 
                
                $application
                        .update(newData, function (response, headers) {
                            $location.path('application/' + response.id + '/address');
                        });
            };

            $scope.add_phone = function (form, phone) {
                //ui-select :::load selected value:::
                if ($scope.ddl_phone_type !== undefined)
                        phone.phone_type = $scope.ddl_phone_type.selected.name;
        
                var data = angular.copy(phone);
                if ($scope.application.phones) {
                    $scope.application.phones.push(data);
                } else {
                    $scope.application.phones = [data];
                }
                form.$reset();
            };

            $scope.remove_phone = function (index) {
                $scope.application.phones.splice(index, 1);
            };

            /* get dropdown data */
            $application.get({method: 'types'}, function (types) {
                
                $scope.dropdown = types;
                $scope.update_ui_select_dropdown();                  
            });
 
            $scope.exit = function () { 
                var data = angular.copy($scope.application);
                data.page = 2;
                data.method = $scope.application.id;

                //grab the updated value (if any) from the ui-select dropdown
                var newData = $scope.update_payload_data(data); 
                $application
                        .update(newData, function (response, headers) {
                            $location.path('/');
                        });
            };
            
            $scope.ddl_number_of_dependents = {};
            $scope.numberofdependents = [ 
                {value: '0', name: 'No dependents' },
                {value: '1', name: '1 Dependent' },
                {value: '2', name: '2 Dependents' },
                {value: '3', name: '3 Dependents' },
                {value: '4', name: '4 Dependents' },
                {value: '5', name: '5 Dependents' },
                {value: '6', name: '6 Dependents' },
                {value: '7', name: '7 Dependents' },
                {value: '8', name: '8 Dependents' },
                {value: '9', name: '9 Dependents' },
                {value: '10', name: '10 Dependents' },
                {value: '11', name: '11 Dependents' },
                {value: '12', name: '12 Dependents' },
                {value: '13', name: '13 Dependents' },
                {value: '14', name: '14 Dependents' },
                {value: '15', name: '15 Dependents' },
                {value: '16', name: '16 Dependents' },
                {value: '17', name: '17 Dependents' },
                {value: '18', name: '18 Dependents' },
                {value: '19', name: '19 Dependents' },
                {value: '20', name: '20 Dependents' }
            ]
            
            
            $scope.clearme = function(model){
                
              if(model === 'prefix')
              {
                  $scope.ddl_prefix = undefined;
                  $scope.ddl_prefix = {};
              }
              else if(model === 'suffix')
              {
                $scope.ddl_suffix = undefined;
                $scope.ddl_suffix = {};
              }
              else if(model === 'ddl_number_of_dependents') 
              {
                $scope.ddl_number_of_dependents = undefined;
                $scope.ddl_number_of_dependents = {};
              }
              else if(model === 'phone_type')  
              {
                $scope.ddl_phone_type = undefined;
                $scope.ddl_phone_type = {};
              }
            }
             $scope.update_payload_data = function(data) {
                //ui-select :::new selected value assign to applicaiton before it saves new value:::
                 if ($scope.ddl_prefix.selected !== undefined)
                    data.prefix = $scope.ddl_prefix.selected.name;
                if ($scope.ddl_suffix.selected !== undefined)
                    data.suffix = $scope.ddl_suffix.selected.name;
                //data.number_of_dependents = $scope.ddl_number_of_dependents.selected !== undefined ? data.number_of_dependents : $scope.ddl_number_of_dependents.selected.name;
                return data;
            }
            
            $scope.update_ui_select_dropdown = function() 
            {
                //ui-select :::load selected value from db:::
                if ($scope.application.prefix !== undefined && $scope.application.prefix !== ' ')
                    $scope.ddl_prefix.selected = { name: $scope.application.prefix };
                if ($scope.application.suffix !== undefined  && $scope.application.suffix !== ' ')
                    $scope.ddl_suffix.selected = { name: $scope.application.suffix };
                if ($scope.application.number_of_dependents !== undefined)
                    $scope.ddl_number_of_dependents.selected = { name: $scope.application.number_of_dependents };
                //return data;
            }
        });
