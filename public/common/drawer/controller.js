'use strict';
/* Drawer Controller */

angular.module('sunloan')
        .controller('drawer',
                function ($scope, $routeParams, $borrower, $drawer, $history, $line) {

                    console.log("@init: drawer");

                    $scope.transfer = {
                        amount: null,
                        from_drawer: $routeParams.id || 0
                    };
 
                    $scope.dollars = [];
                    $scope.rolls = [];
                    $scope.coins = [];
                    $scope.cash = "";
                    $scope.checks = [];
                    $scope.check = "";
                    $scope.checks_total = 0;
                    $scope.checks_number = "";
                    $scope.vouchers = [];
                    $scope.voucher = "";
                    $scope.vouchers_total = 0;
                    $scope.vouchers_number = "";
                    $scope.cards = [];
                    $scope.card = "";
                    $scope.cards_total = 0;
                    $scope.card_number = "";
                    $scope.money_orders = [];
                    $scope.money_order = "";
                    $scope.money_orders_total = 0;
                    $scope.money_order_number = "";

                    $scope.grand_total = 0;

                    $scope.today = new Date();

                    $scope.updateDollar = function (el, amount) {

                        if (!$scope.dollars[el]) {
                            $scope.dollars[el] = {value: 0, total: 0};
                        }

                        var object = $scope.dollars[el];

                        object.total = amount * angular.copy($scope.dollars[el].value);

                        $scope.sum();
                    };

                    $scope.updateRoll = function (el, amount) {

                        if (!$scope.rolls[el]) {
                            $scope.rolls[el] = {value: 0, total: 0};
                        }

                        var object = $scope.rolls[el];

                        object.total = amount * angular.copy($scope.rolls[el].value);

                        $scope.sum();
                    };

                    $scope.updateCoin = function (el, amount) {

                        if (!$scope.coins[el]) {
                            $scope.coins[el] = {value: 0, total: 0};
                        }

                        var object = $scope.coins[el];

                        object.total = amount * angular.copy($scope.coins[el].value);

                        $scope.sum();
                    };

                    $scope.addMoney = function (type) {
                        switch (type) {
                            case "check":
                                if ($scope.check) {

                                    if ($scope.check) {
                                        $scope.checks.push({number: $scope.check_number, amount: parseFloat($scope.check || 0)});
                                        $scope.check = null;
                                        $scope.check_number = null;
                                        $scope.checks_total = 0;

                                        angular.forEach($scope.checks, function (check) {
                                            $scope.checks_total += check.amount;
                                        });
                                    }
                                }
                                break;
                            case "card":

                                if ($scope.card) {
                                    $scope.cards.push({number: $scope.card_number, amount: parseFloat($scope.card)});
                                    $scope.card = null;
                                    $scope.card_number = null;
                                    $scope.cards_total = 0;

                                    angular.forEach($scope.cards, function (card) {
                                        $scope.cards_total += card.amount;
                                    });
                                }
                                break;
                            case "voucher":
                                if ($scope.voucher) {
                                    $scope.vouchers.push({number: $scope.voucher_number, amount: parseFloat($scope.voucher)});
                                    $scope.voucher = null;
                                    $scope.voucher_number = null;
                                    $scope.vouchers_total = 0;

                                    angular.forEach($scope.vouchers, function (voucher) {
                                        $scope.vouchers_total += voucher.amount;
                                    });
                                }

                                break;
                            case "money_order":
                                if ($scope.money_order) {
                                    $scope.money_orders.push({number: $scope.money_order_number, amount: parseFloat($scope.money_order)});
                                    $scope.money_order = null;
                                    $scope.money_order_number = null;
                                    $scope.money_orders_total = 0;

                                    angular.forEach($scope.money_orders, function (money_order) {
                                        $scope.money_orders_total += money_order.amount;
                                    });
                                }
                                break;

                        }

                        $scope.sum();
                    };

                    $scope.removeMoney = function (type, index) {
                        switch (type) {
                            case "check":
                                $scope.checks.splice(index, 1);
                                $scope.checks_total = 0;

                                angular.forEach($scope.checks, function (check) {
                                    $scope.checks_total += check.amount;
                                });
                                break;
                            case "voucher":
                                $scope.vouchers.splice(index, 1);
                                $scope.vouchers_total = 0;

                                angular.forEach($scope.vouchers, function (voucher) {
                                    $scope.vouchers_total += voucher.amount;
                                });

                                break;
                            case "card":
                                $scope.cards.splice(index, 1);
                                $scope.cards_total = 0;

                                angular.forEach($scope.cards, function (card) {
                                    $scope.cards_total += card.amount;
                                });

                                break;
                            case "money_order":
                                $scope.money_orders.splice(index, 1);
                                $scope.money_orders_total = 0;

                                angular.forEach($scope.money_orders, function (money_order) {
                                    $scope.money_orders_total += money_order.amount;
                                });

                                break;
                        }

                        $scope.sum();
                    };

                    $scope.sum = function () {

                        $scope.cash = 0;

                        angular.forEach($scope.dollars, function (bill) {
                            if (bill !== undefined) {
                                $scope.cash += bill.total;
                            }
 
                        });

                        angular.forEach($scope.rolls, function (roll) {
                            if (roll !== undefined) {
                                $scope.cash += roll.total;
                            }

                        });

                        angular.forEach($scope.coins, function (coin) {
                            if (coin !== undefined) {
                                $scope.cash += coin.total;
                            }

                        });

                        $scope.grand_total = $scope.cash + $scope.checks_total + $scope.vouchers_total + $scope.cards_total + $scope.money_orders_total;
                    };

                    /* get selected drawer from rest*/
                    if ($routeParams.id) {

                        $history.current({id: $routeParams.id}, function (drawer) {
                            $scope.drawer = drawer;
                        }); 

                    }

                    /* get all lines from rest */
                    $line.all(function (lines) {
                        $scope.lines = lines;
                    });

                    /* get all drawers from rest */
                    $drawer.all(function (drawers) {
                        $scope.drawers = drawers;
                    });

                });