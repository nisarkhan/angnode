'use strict';
angular.module('sunloan')
        .controller('collection',
                function ($scope, $rootScope, $routeParams, $collect, $callroute, $delinquency, $employee, $location) {

                    $scope.query = {
                        //assigned: false,
                        type: '30s'
                    };

                    $scope.delinquencies = [];
                    $scope.employees = [];

                    $employee.query(function (data) {
                        $scope.employees = data;
                    });

                    $scope.employee = {};

                    $scope.collections = function () {
                        $("#delinquency_processing").css("visibility","visible");
                        var query = angular.copy($scope.query);
                        $delinquency.unassigned(query, function (result) {
                            $scope.delinquencies = result;
                            $("#delinquency_processing").css("visibility","hidden");
                        });
                    };

                    $scope.manage = function (e) {
                        var data = $scope.grids.delinquency.$get(e);
                        console.log("@loan", data);
                        $location.path('/borrower/' + data.account_number).replace();

                    };

                    $scope.assign = function (loan) {

                        var loans = [],
                                grid = $scope.grids.delinquency,
                                checked = angular.element("input[type='checkbox']:checked", grid);

                        if (checked.length < 1) {
                            $rootScope.alert("Please select a loan to assign.", "Continue");
                        }
                        
                        for(var i = 0; i < checked.length; i++){
                            
                        }

                        checked.each(function (index, input) {

                            var delinquency = angular.copy($scope.delinquencies[index]);

                            var params = {loan_id: delinquency.loan, employee_id: loan.employee_id, status: "Assigned"};
                            loans.push(params);

                            $callroute.assign(params, function (result) {
                                
                                if (index + 1 === checked.length) {
                                    $scope.collections();
                                    $rootScope.$notifications.push({
                                        type: 'success',
                                        title: 'Loan Assigned',
                                        message: 'Loan ' + delinquency.loan + ' was assigned sucessfully.'
                                    });
                                }
                                
                            });
                        });
                    };

                    $scope.check = function (e) {
                        var options = angular.element("input[type='checkbox']", $scope.grids.delinquency);
                        options.prop("checked", true);
                        $scope.checked = true;
                    };

                    $scope.uncheck = function (e) {
                        var options = angular.element("input[type='checkbox']", $scope.grids.delinquency);
                        options.prop("checked", false);
                        $scope.checked = false;
                    };
                });
