'use strict';
/* Writeoff Controller */

angular.module('sunloan')
        .controller('check',
                function ($rootScope, $scope, $routeParams, $timeout, $checkbook, $check) {

                    $scope.today = new Date();

                    $scope.checkbook = {
                        checkbook_number: '',
                        check_start: '',
                        check_end: '',
                        check_current: '',
                        account_number: '',
                        routing_number: '',
                        open_date: '',
                        closed_date: '',
                        description: ''
                    }

                    $scope.check = {
                        checkbook_id: '',
                        check_number: '',
                        amount: '',
                        pay_to: '',
                        memo: '',
                        from_drawer: '',
                        from_line: '',
                        account_number: '',
                        written_date: '',
                        written_by: '',
                        void_date: '',
                        return_date: ''

                    }

                    $scope.checks = [];

                    $scope.create = function () {

                        $scope.checkbook.open_date = new Date();

                        $checkbook.post($scope.checkbook, function (data) {
                            console.log(data);
                            $scope.checkbook = data;
                        });
                    }

                    $scope.write = function () {
                        var now = new Date();
                        $scope.check.checkbook_id = $scope.checkbook.id;
                        $scope.check.written_by = $rootScope.user.id;
                        $scope.check.written_date = now;
                        $scope.check.amount = parseFloat($scope.check.amount);
                        $scope.check.from_line = 'Expenses';

                        $check.post(
                                {number: $scope.checkbook.checkbook_number},
                        $scope.check,
                                function (data) {
                                    console.log(data);
                                    $scope.checkbook_id = '';
                                    $scope.check.check_number = '';
                                    $scope.check.amount = '';
                                    $scope.check.pay_to = '';
                                    $scope.check.memo = '';
                                    $scope.check.from_drawer = '';
                                    $scope.check.from_line = '';
                                    $scope.check.account_number = '';
                                    $scope.check.written_date = '';
                                    $scope.check.written_by = '';
                                    $scope.check.void_date = '';
                                    $scope.check.return_date = '';
                                    $scope.refresh();
                                    console.log($scope.check);
                                });
                    }

                    $scope.void = function (e) {
                        var ck = $scope.grids.checks.$get(e);
                        ck.void_date = new Date();
                        $check.void(
                                {number: $scope.checkbook.checkbook_number,
                                    check: ck.check_num},
                        ck,
                                function (data) {
                                    console.log("@check", data);
                                    $scope.refresh();
                                });


                    }

                    $scope.return = function (e) {
                        var ck = $scope.grids.checks.$get(e);
                        ck.return_date = new Date();
                        $check.put(
                                {number: $scope.checkbook.id,
                                    check: ck.check_num},
                        ck,
                                function (data) {
                                    console.log("@check", data);
                                });


                    }

                    $scope.update = function () {
                        $checkbook.put({id: $scope.checkbook.checkbook_number}, $scope.checkbook, function (data) {
                            console.log(data);
                            $scope.checkbook = data;
                        });
                    }

                    $scope.save = function () {

                        if ($scope.checkbook.id) {
                            $scope.update();
                        } else {
                            $scope.create();
                        }
                    }

                    $scope.close = function () {

                        $scope.checkbook.closed_date = new Date();

                        $checkbook.put({id: $scope.checkbook.checkbook_number}, $scope.checkbook, function (data) {
                            console.log(data);
                            $scope.checkbook = data;
                        });
                    }

                    /* get all lines from rest */
                    $scope.checkbooks = $checkbook.all();

                    $checkbook.accounts(function (data) {
                        $scope.accounts = data;
                    });


                    $scope.refresh = function () {
                        $checkbook.current(function (data) {
                            if (data.length > 0) {

                                $scope.checkbook = data[0];

                                $check.get({number: $scope.checkbook.checkbook_number}, function (data) {
                                    $scope.checks = data;
                                });

                            }
                            console.log($scope.checkbook);
                        });
                    }
               
                    $scope.organization = {
                        id: 1,
                        organization_name: 'Sun Loan Test',
                        description: 'This is a test organization.  There should be no production record in this organization table.',
                        address: '123 Test Address',
                        city: 'Test City',
                        state: 'TT',
                        zip: '12345',
                        zip_four: '0000'
                    };

                    $scope.refresh();
                });
