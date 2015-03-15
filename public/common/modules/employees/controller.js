'use strict';
/* Employees Controller */

angular.module('sunloan')
.controller('employees',
    function ($scope, $rootScope, $routeParams, $timeout, $employees) {

        $scope.employees = $employees.get({ id: $rootScope.$id }, function(response){
            if('id' in response) 
            {        
               //$scope.grids['employees'].$add(angular.extend($scope['employees'], response));
               // $scope.employees_data = {first_name: '', last_name: '', user_name: ''};
               // $scope.employees_data = response;
               // $scope.grids.employees.$data($scope.employees_data); 
               //$scope.grids.employees.$data(JSON.stringify($scope.employees));
                console.log("@employees", response);
            }
        });
        
         $scope.create = function(model, data, form) {            
            $scope.grids[model].$add(angular.extend($scope[model], data));
            form.$reset();
        };

        //$employees.query($scope.employees.id, function(data) {
            //debugger;
            //if ($scope.employees !== undefined) { $scope.grids.employees.$data($scope.employees); }
        //});
                
        $scope.remove = function(model, e) {
            $scope.grids[model].$delete(e);
        };

        $scope.update = function(model, data) {
            $scope.grids[model].$update(data);
        };

        $scope.open = function(model, e) {
            $scope[model].$selected = $scope.grids[model].$open(e);
        };

        $scope.save = function(list) {
            return function(data) {
                if (data.length > 0) {
                    var employees = angular.copy(data);                    
                    if ($scope.employees !== null && "id" in $scope.employees) {
                        var params = {
                            id: $scope.employees.id
                        };
                        params[list] = employees; 
                         
                        $employees.update(params, function(response) { debugger;
                            /* show sucess message */
                            /*$rootScope.$notifications.push({
                                type: 'success',
                                title: 'Employee.',
                                message: 'The employee data was updated succesfully.'
                            });*/
                            console.log("$employees: updated", response);
                        })
                    }
                }
            };

        };
                         
});
