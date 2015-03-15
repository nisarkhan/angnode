'use strict';
/* Drawer Controller */

angular.module('sunloan')
        .controller('drawer',
                function ($scope, $routeParams, $drawer, $history, $filter, $employee, $chartofaccounts, $cashtransfer, $form_error, $rootScope, $tender_types) {
                    
                    console.log("@init: drawer");
                    
                    $scope.drawer = {};
                    $scope.employee = {};
                    
                    $scope.accounts = $chartofaccounts.query({cash_transfer_use:true});
                    $scope.drawers = $drawer.query();
                    $scope.tenders = $tender_types.query();
                    
                    $scope.create = function(transfer) {
                      
                      $cashtransfer.save(transfer, function(value, response) {
                          
                          $rootScope.$notifications.push({
                              type: 'success',
                              title: 'Created cashtransfer',
                              message: 'The cash transfer was successfully created'
                          });
                          
                      }, function(response) {
                          $form_error($scope.drawer_transfer, response);
                      });
                      
                    };

                    $scope.history = {
                        active: true,
                        drawer_id: 0,
                        history_date: new Date(),
                        type: 'Closed'
                    };
                    
/*
                    $scope.transfer = {
                        amount: null,
                        from_drawer: $routeParams.id || 0
                    };
*/

                    $scope.bills100 = {
                        "history_id": 0,
                        "type": 'Bill 100',
                        "value": 100.00,
                        "count": '',
                        "description": 'Cash added using the UI',
                        "active": true
                    }
                    $scope.bills50 = {
                        history_id: 0,
                        type: 'Bill 50',
                        value: 50.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.bills20 = {
                        history_id: 0,
                        type: 'Bill 20',
                        value: 20.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.bills10 = {
                        history_id: 0,
                        type: 'Bill 10',
                        value: 10.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.bills5 = {
                        history_id: 0,
                        type: 'Bill 5',
                        value: 5.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.bills1 = {
                        history_id: 0,
                        type: 'Bill 1',
                        value: 1.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.rolls50 = {
                        history_id: 0,
                        type: 'Roll 50',
                        value: 10.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true

                    };
                    $scope.rolls25 = {
                        history_id: 0,
                        type: 'Roll 25',
                        value: 10.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true

                    };
                    $scope.rolls10 = {
                        history_id: 0,
                        type: 'Roll 10',
                        value: 5.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true

                    };
                    $scope.rolls5 = {
                        history_id: 0,
                        type: 'Roll 5',
                        value: 2.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true

                    };
                    $scope.rolls1 = {
                        history_id: 0,
                        type: 'Roll 1',
                        value: .50,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };

                    $scope.coins100 = {
                        history_id: 0,
                        type: 'Coin 100',
                        value: 1.00,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.coins50 = {
                        history_id: 0,
                        type: 'Coin 50',
                        value: .50,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.coins25 = {
                        history_id: 0,
                        type: 'Coin 25',
                        value: .25,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.coins10 = {
                        history_id: 0,
                        type: 'Coin 10',
                        value: .10,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.coins5 = {
                        history_id: 0,
                        type: 'Coin 5',
                        value: .05,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.coins1 = {
                        history_id: 0,
                        type: 'Coin 1',
                        value: .01,
                        count: '',
                        description: 'Cash added using the UI',
                        active: true
                    };
                    $scope.check = {
                        active: true,
                        description: "Doc add using the UI.",
                        history_id: 3,
                        number: '',
                        type: "Check",
                        value: ''
                    };
                    $scope.card = {
                        history_id: 0,
                        type: 'Card',
                        value: '',
                        number: '',
                        description: 'Doc add using the UI.',
                        active: true
                    }
                    $scope.voucher = {
                        history_id: 0,
                        type: 'Voucher',
                        value: '',
                        number: '',
                        description: 'Doc add using the UI.',
                        active: true
                    };
                    $scope.money_order = {
                        history_id: 0,
                        type: 'Money Order',
                        value: '',
                        number: '',
                        description: 'Doc add using the UI.',
                        active: true
                    };

                    $scope.checks_total = 0;
                    $scope.vouchers_total = 0;
                    $scope.cards_total = 0;
                    $scope.money_orders_total = 0;
                    $scope.grand_total = 0;
                    $scope.today = new Date();

                    $scope.addDoc = function (doc) {

                        var d = angular.copy(doc);

                        d.history_id = $scope.history.id;

                        $history.docs.post({drawer: $scope.history.drawer_id,
                            history: $scope.history.id},
                        d, function (data) {

                            $scope.refreshDocs();

                        }, function (error) {
                            console.log(error);
                        });

                        $scope.clearDocs();

                    };

                    $scope.deleteDoc = function (doc) {

                        $history.docs.delete({drawer: $scope.history.drawer_id,
                            history: $scope.history.id, id: doc.id},
                        doc, function (data) {

                            $scope.refreshDocs();

                        }, function (error) {
                            console.log(error);
                        });

                        $scope.clearDocs();
                    }

                    $scope.clearDocs = function () {
                        $scope.check.value = '';
                        $scope.check.number = '';
                        $scope.card.value = '';
                        $scope.card.number = '';
                        $scope.voucher.value = '';
                        $scope.voucher.number = '';
                        $scope.money_order.value = '';
                        $scope.money_order.number = '';
                    }

                    $scope.save = function () {

                        $scope.saveCash($scope.bills1);
                        $scope.saveCash($scope.bills10);
                        $scope.saveCash($scope.bills100);
                        $scope.saveCash($scope.bills20);
                        $scope.saveCash($scope.bills5);
                        $scope.saveCash($scope.bills50);
                        $scope.saveCash($scope.rolls1);
                        $scope.saveCash($scope.rolls10);
                        $scope.saveCash($scope.rolls25);
                        $scope.saveCash($scope.rolls5);
                        $scope.saveCash($scope.rolls50);
                        $scope.saveCash($scope.coins1);
                        $scope.saveCash($scope.coins10);
                        $scope.saveCash($scope.coins25);
                        $scope.saveCash($scope.coins5);
                        $scope.saveCash($scope.coins50);

                    }
                    $scope.setStatus = function (status) {

                        $scope.save();

                        $scope.history.type = status;

                        $history.put({drawer: $scope.history.drawer_id},
                        $scope.history, function (data) {
                            $scope.history = data;
                        });
                    }
                    $scope.close = function () {
                        var history = angular.copy($scope.history);
                        history.type = 'Close';

                    }
                    $scope.saveCash = function (cash) {
                        if (cash.id === undefined || cash.id === 0) {
                            $scope.addCash(cash);
                        } else {
                            $scope.updateCash(cash);
                        }
                    };
                    $scope.addCash = function (cash) {
                        var c = angular.copy(cash);
                        c.history_id = $scope.history.id;
                        $history.cash.post({drawer: $scope.drawer.drawer_number},
                        c, function (data) {
                            console.log(data);
                        });
                    };
                    $scope.updateCash = function (cash) {
                        $history.cash.put({drawer: $scope.drawer.drawer_number,
                            history: $scope.history.id,
                            id: cash.id}, cash, function (data) {
                            console.log(data);
                        });
                    };
                    $scope.deleteCash = function (cash) {

                        $history.cash.delete({drawer: $scope.history.drawer_id,
                            history: $scope.history.id},
                        cash, function (data) {
                            $scope.refreshCash();

                        });
                    }
                    $scope.refreshCash = function () {
                        $history.cash.get({drawer: $scope.history.drawer_id,
                            history: $scope.history.id}, function (data) {

                            $scope.cash = data;

                            var bills100 = $filter('filter')($scope.cash, 'Bill Hundred');
                            if (bills100.length > 0)
                                $scope.bills100 = bills100[0];
                            var bills50 = $filter('filter')($scope.cash, 'Bill Fifty');
                            if (bills50.length > 0)
                                $scope.bills50 = bills50[0];
                            var bills20 = $filter('filter')($scope.cash, 'Bill Twenty');
                            if (bills20.length > 0)
                                $scope.bills20 = bills20[0];
                            var bills10 = $filter('filter')($scope.cash, 'Bill Ten');
                            if (bills10.length > 0)
                                $scope.bills10 = bills10[0];
                            var bills5 = $filter('filter')($scope.cash, 'Bill Five');
                            if (bills5.length > 0)
                                $scope.bills5 = bills5[0];
                            var bills1 = $filter('filter')($scope.cash, 'Bill One');
                            if (bills1.length > 0)
                                $scope.bills1 = bills1[0];
                            var rolls50 = $filter('filter')($scope.cash, 'Roll Fifty');
                            if (rolls50.length > 0)
                                $scope.rolls50 = rolls50[0];
                            var rolls25 = $filter('filter')($scope.cash, 'Roll Twenty Five');
                            if (rolls25.length > 0)
                                $scope.rolls25 = rolls25[0];
                            var rolls10 = $filter('filter')($scope.cash, 'Roll Ten');
                            if (rolls10.length > 0)
                                $scope.rolls10 = rolls10[0];
                            var rolls5 = $filter('filter')($scope.cash, 'Roll Five');
                            if (rolls5.length > 0)
                                $scope.rolls5 = rolls5[0];
                            var rolls1 = $filter('filter')($scope.cash, 'Roll One');
                            if (rolls1.length > 0)
                                $scope.rolls1 = rolls1[0];
                            var coins50 = $filter('filter')($scope.cash, 'Coin Fifty');
                            if (coins50.length > 0)
                                $scope.coins50 = coins50[0];
                            var coins25 = $filter('filter')($scope.cash, 'Coin Twenty Five');
                            if (coins25.length > 0)
                                $scope.coins25 = coins25[0];
                            var coins10 = $filter('filter')($scope.cash, 'Coin Ten');
                            if (coins10.length > 0)
                                $scope.coins10 = coins10[0];
                            var coins5 = $filter('filter')($scope.cash, 'Coin Five');
                            if (coins5.length > 0)
                                $scope.coins5 = coins5[0];
                            var coins1 = $filter('filter')($scope.cash, 'Coin One');
                            if (coins1.length > 0)
                                $scope.coins1 = coins1[0];

                            $scope.sum();
                        });
                    }
                    $scope.refreshDocs = function () {
                        $history.docs.get({drawer: $scope.history.drawer_id, history: $scope.history.id}, function (data) {
                            $scope.docs = data;
                            $scope.sum();
                        });
                    }
                    $scope.sum = function () {
                        $scope.checks_total = $filter('sumDocTender')($scope.docs, 'Check');
                        $scope.cards_total = $filter('sumDocTender')($scope.docs, 'Card');
                        $scope.vouchers_total = $filter('sumDocTender')($scope.docs, 'Voucher');
                        $scope.money_orders_total = $filter('sumDocTender')($scope.docs, 'Money Order');
                        $scope.cash_total = ($scope.bills100.count * $scope.bills100.value) +
                                ($scope.bills50.count * $scope.bills50.value) +
                                ($scope.bills20.count * $scope.bills20.value) +
                                ($scope.bills10.count * $scope.bills10.value) +
                                ($scope.bills5.count * $scope.bills5.value) +
                                ($scope.bills1.count * $scope.bills1.value) +
                                ($scope.rolls50.count * $scope.rolls50.value) +
                                ($scope.rolls25.count * $scope.rolls25.value) +
                                ($scope.rolls10.count * $scope.rolls10.value) +
                                ($scope.rolls5.count * $scope.rolls5.value) +
                                ($scope.rolls1.count * $scope.rolls1.value) +
                                ($scope.coins100.count * $scope.coins100.value) +
                                ($scope.coins50.count * $scope.coins50.value) +
                                ($scope.coins25.count * $scope.coins25.value) +
                                ($scope.coins10.count * $scope.coins10.value) +
                                ($scope.coins5.count * $scope.coins5.value) +
                                ($scope.coins1.count * $scope.coins1.value);
                        $scope.grand_total = $scope.checks_total +
                                $scope.cards_total +
                                $scope.vouchers_total +
                                $scope.money_orders_total +
                                $scope.cash_total;

                    }

                    /* get selected drawer from rest*/
                    if ($routeParams.id) {

                        $drawer.get({id: $routeParams.id}, function (drawer) {

                            $scope.drawer = drawer;

                            $employee.get({id: $scope.drawer.assigned_to}, function (employee) {
                                $scope.employee = employee;
                            });
                        });

                        $history.current.get({drawer: $routeParams.id}, function (history) {

                            $scope.history = history;
                            $scope.refreshDocs();
                            $scope.refreshCash();

                        });
                    }
                });