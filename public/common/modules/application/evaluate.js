'use strict';
/* Dashboard Controller */

angular
        .module('sunloan')
        .controller('application.evaluate', function ($scope, $routeParams,
                $rootScope, $location, $storage, $application, $filter, 
                $loan) {

            $scope.application = $application.get({method: $routeParams.id}, function (response) {

                if (!'id' in response)
                    $location.path('application');

                $scope.total_debt = $filter('sumValues')($scope.application.debts, 'value');
                $scope.total_income = $filter('sumValues')($scope.application.other_incomes, 'amount');
                $scope.free_income = $scope.total_income - $scope.total_debt;


            });

            $scope.rates = $loan.rate();

            $scope.select = function (data) {
                $scope.rate = angular.copy(data);
                $storage.put('rate', $scope.rate);
            };


            /* get the evaluation types */
            $application.get({method: 'types'}, function (types) {
                $scope.dropdown = types;
            });

            $scope.save = function (data) {
                /* save new application parameters */
                $location.path('/');
            }

            $scope.status = function (status) {

                var data = angular.copy($scope.application);

                if (status == 'Declined') {
                    /* redirect to decline view */
                    $location.path('/application/' + data.id + '/decline');

                } else {

                    if ($scope.rate) {

                        data.approval_date = new Date();
                        data.approved_by = $rootScope.user.user_name;
                        data.payments = $scope.rate.number_of_payments;
                        data.net_loan = $scope.rate.total_note;
                        
                    } else {
                        $rootScope.alert("Please select a rate to continue.", "Continue");
                        return;
                    }

                    console.log(data);
                    /* approve and redirect dashboard */
                    $application
                            .update(angular.extend(data, {status: status, method: data.id}), function (response, headers) {

                                if (response.status == 'Approved') {

                                    $rootScope.$notifications.push({
                                        type: 'success',
                                        title: 'Application Approved.',
                                        message: 'The loan application was succesfully approved.'
                                    });
                                    $location.path('/');
                                }
                            });
                }
            };
        });
