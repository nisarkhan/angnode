'use strict';
/* Dashboard Controller */

angular
        .module('sunloan')
        .controller('loan.renew', function ($scope, $routeParams, $rootScope,
                $location, $storage, $loan, $borrower) {

            $borrower.get({account: $routeParams.id},
            function (response) {
                $scope.borrower = response;
                $scope.loan = $loan.get({account: $routeParams.id, number: $scope.borrower.number_of_loans})
            });

            /* get rates list*/
            $loan.rate(function (rates) {
                $scope.rates = rates;
            });

            $scope.select = function (data) {
                $scope.rate = angular.copy(data);
                $storage.put('rate', $scope.rate);
            };

            $scope.renew = function () {

                $loan.renew(
                        {account: $scope.borrower.account_number,
                            loan: $scope.loan.loan_number},
                JSON.stringify($scope.rate),
                        function (response) {

                            console.log($storage.get('rate'));

                            $('#modal-renew').modal('hide');

                            $rootScope.$notifications.push({
                                type: 'success',
                                title: 'Loan Renewal',
                                message: 'The loan was successfully renewed.'
                            });

                            $location.path('/');
                        },
                        function (error) {
                            console.log($storage.get('rate'));

                            $('#modal-renew').modal('hide');
                            
                            var message = '';
                            
                            for(var i = 0; i < error.data.length; i++){
                                message += error.data[i];
                            }

                            $rootScope.$notifications.push({
                                type: 'danger',
                                title: 'Loan Not Renewed',
                                message: message
                            });
                        });
            };
        });
