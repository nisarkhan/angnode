'use strict';
/* Dashboard Controller */

angular
        .module('sunloan')
        .controller('loan.make', function ($scope, $routeParams, $rootScope,
                $location, $storage, $loan, $application, $promissory_notes,
                $window, $filter) {

            $scope.application = $application.get({method: $routeParams.id}, function (response) {
                if (!'id' in response)
                    $location.path('application');

                $scope.total_debt = $filter('sumValues')($scope.application.debts, 'value');
                $scope.total_income = $filter('sumValues')($scope.application.other_incomes, 'amount');
                $scope.free_income = $scope.total_income - $scope.total_debt;

            });

            $scope.rate = $storage.get('rate');

            $scope.rates = $loan.rate();

            console.log("@application", $scope.application);
            console.log("@rate", $scope.rate);

            $scope.make_loan = function () {

                if ('borrower_account_number' in $scope.application) {
                    /* create loan if borrower exists */
                    $scope.make();

                } else {
                    /* create borrower */
                    $scope.application.borrower_created = true;

                    $application.borrower({id: $scope.application.id}, $scope.application, function (response, headers) {
                        $scope.application = response;
                        $scope.make();
                    });
                }
            }

            $scope.print_note = function () {
                $promissory_notes.query({account: $scope.application.borrower_account_number}, function (data) {
                    if (data.length > 0) {
                        $scope.promissory_note = data[data.length - 1];
                        $window.open($scope.promissory_note.path + '.pdf');
                    } else {
                        var loan = angular.copy($scope.rate);
                        loan.account = $scope.application.borrower_account_number;
                        $promissory_notes.post({account: loan.account}, loan, function (data) {
                            $scope.promissory_note = data;
                            $window.open($scope.promissory_note.path + '.pdf');
                        });
                    }
                });
            }

            $scope.select = function (data) {
                $scope.rate = angular.copy(data);
                $storage.put('rate', $scope.rate);
            };

            $scope.complete = function () {
                $location.path('/borrower/' + $scope.application.borrower_account_number);
            }

            $scope.make = function () {

                var loan = angular.copy($scope.rate);

                loan.account = $scope.application.borrower_account_number;

                $loan.query({account: loan.account}, function (data) {

                    if (data.length === 0) {
                        $loan.make(loan, function (response, headers) {
                            /* change application status and redirect to borrower loans view */
                            $application.update({method: $scope.application.id, status: 'Approved and completed'}, function (response) {
                                $rootScope.$notifications.push({
                                    type: 'success',
                                    title: 'Loan Application',
                                    message: 'The loan application was created successfully.'
                                });
                            });

                            $scope.loan = response;
                        });
                    } else {
                        $scope.loan = data[data.length - 1];
                    }
                });
            };
        });
