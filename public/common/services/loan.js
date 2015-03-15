'use strict';
/* Loan Service */
angular
        .module('sunloan')

        .factory('$loan', function ($resource, $response, $path) {

            var $loan = $resource($path.rest + '/rest/borrower/:account/loan/:number', {},
                    {
                        find: {
                            url: $path.rest + '/rest/loan/find',
                            method: 'GET',
                            isArray: true
                        },
                        rate: {
                            url: $path.rest + '/rest/loan/rate',
                            method: 'GET',
                            isArray: true
                        },
                        make: {
                            url: $path.rest + '/rest/borrower/:account/loan',
                            params: {
                                account: '@account'
                            },
                            method: 'POST'
                        },
                        current: {
                            url: $path.rest + '/rest/borrower/:account/loan/:number/current/payment',
                            params: {
                                account: '@account',
                                number: '@number'
                            },
                            method: 'GET',
                            isArray: true
                        },
                        promissory_note: {
                            url: $path.rest + '/rest/borrower/:account/promissory-note',
                            query: {
                                method: 'GET',
                                isArray: true
                            }
                        },
                        renew: {
                            url: $path.rest + '/rest/borrower/:account/loan/:loan/transaction/balance-renewal',
                            Params: {account: '@account', loan: '@loan'},
                            method: 'PUT'
                        },
                        writeoff:{
                            url: $path.rest + '/rest/borrower/:account/loan/:loan/writeoff',
                            params:{account: '@account', loan: '@loan'},
                            method: 'PUT'
                        },
                        nsf:{
                            url: $path.rest + '/rest/borrower/:account/loan/:loan/nsf',
                            params:{account: '@account', loan: '@loan'},
                            method: 'POST'
                        },                       
                        balance_renewal:{
                            url:$path.rest + '/rest/borrower/:account/loan/:loan/balance-renewal',
                            params:{account: '@account', loan: '@loan'},
                            method: 'GET'                          
                        }
                    });

            $loan.prototype.$check = function () {
                return '<div class="checkbox"><input id="checkbox-' + this.loan_number + '" type="checkbox" value="' + this.loan_number + '"/><label for="checkbox-' + this.loan_number + '"></label></div>';
            };

            $loan.prototype.$options = function () {
                return '<div class="table-buttons">' +
                        '<a href="#/borrower/{{borrower.account_number}}/loan/' + this.loan_number + '" class="btn btn-white btn-sm"> <i class="fa fa-exchange"></i> Transactions</a>' +
                        '</div>';
            };
            return $loan;

        })

        .factory('$contact', function ($resource, $response, $path) {

            //var $contact = $resource($path.rest+'/rest/borrower/:account/loan/:number/contact');

            var $contact = $resource($path.rest + '/rest/borrower/:account/loan/:number/contact', {},
                    {
                        phone: {
                            url: $path.rest + '/rest/borrower/:account/phone',
                            method: 'GET',
                            isArray: true
                        },
                        residence: {
                            url: $path.rest + '/rest/borrower/:account/residences',
                            method: 'GET',
                            isArray: true
                        },
                        note: {
                            url: $path.rest + '/rest/borrower/:account/loan/:number/contact',
                            params: {
                                account: '@account',
                                number: '@number'
                            },
                            method: 'POST'
                        }

                    });

            $contact.prototype.$options = function () {
                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="remove(\'notes\',$event)"> <i class="fa fa-trash-o"></i> Remove</a>' +
                        '</div>';
            };
            return $contact;

        })

        .factory('$transaction', function ($resource, $response, $path) {

            var $transaction = $resource($path.rest + '/rest/borrower/:account/loan/:number/transaction');

            $transaction.prototype.$options = function () {
                return '<div class="table-buttons">' +
                        '<a class="btn btn-white btn-sm" ng-click="open($event)"> <i class="fa fa-refresh"></i> Reverse</a>' +
                        '</div>';
            };
            return $transaction;

        });
