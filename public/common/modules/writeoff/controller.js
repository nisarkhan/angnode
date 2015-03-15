'use strict';
/* Writeoff Controller */

angular.module('sunloan')
        .controller('writeoff',
                function ($scope, $rootScope, $routeParams, $writeoff, $delinquency, $location, $filter) {

                    $scope.check = function (e) {

                        var options = $("input[type='checkbox']", $scope.grids.writeoff);
                        options.prop("checked", true);
                        $scope.checked = true;

                    };

                    $scope.query = {
                        type: '91+'
                    };
                    
                    $scope.delinquencies = [];

                    $scope.uncheck = function (e) {

                        var options = $("input[type='checkbox']", $scope.grids.writeoff);
                        options.prop("checked", false);
                        $scope.checked = false;

                    };

                    $scope.manage = function (data) {
                        console.log("@loan", data);
                        $location.path('/borrower/' + data.account_number).replace();

                    }


                    $scope.writeoff = function () {


                        if ($scope.selection.length < 1) {
                            $rootScope.alert("Please select a loan to writeoff.", "Continue");
                        }

                        for (var i = 0; i < $scope.selection.length; i++) {

                            var selected = $filter('filter')($scope.writeoffs, {loan: $scope.selection[i]});

                            if (selected.length > 0) {

                                var params = {account: selected[0].account_number, loan: selected[0].loan_number};

                                console.log(selected);

                                $writeoff.writeoff(params, function (result) {
                                    $scope.refresh();
                                    console.log(result);
                                });
                            }

                        }

                        $scope.refresh();
                    };

                    $scope.selection = [];
                    $scope.toggleSelection = function (loan) {

                        var idx = $scope.selection.indexOf(loan);

                        console.log(loan)

                        if (idx > -1) {

                            $scope.selection.splice(idx, 1);

                        }

                        else {

                            $scope.selection.push(loan);

                        }

                    };


                    var query = angular.copy($scope.query);

                    $scope.refresh = function () {

                        $delinquency.recency(query, function (result) {

                            $scope.writeoffs = result;

                        });
                    }

                    $scope.refresh();
                });