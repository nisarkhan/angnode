'use strict';

angular.module('sunloan')

        /* Borrower Search Controller */
        .controller('borrower.search',
                function ($scope, $routeParams, $transaction) {

                    /* set search query */
                    $scope.query = $routeParams.query;
                })

        /* Borrower Loan Controller */
        .controller('borrower.loan',
                function ($scope, $routeParams, $borrower, $transaction) {

                    /* get borrower data */
                    $scope.borrower = $borrower.get({
                        account: $routeParams.account
                    });

                    $transaction.query({
                        account: $routeParams.account,
                        number: $routeParams.id
                    }, function (transactions) {
                        $scope.grids.transactions.$data(transactions);
                    });

                    /* reverse form */
                    $scope.$selected = {};

                    $scope.open = function (e) {
                        $scope.$selected = $scope.grids.transactions.$open(e);
                    };
                    $scope.reverse = function (data) {
                        console.log("@reverse", data);
                    };

                    /* reverse form */
                    $scope.$selected = {};


                    $scope.open = function (e) {
                        $scope.$selected = $scope.grids.transactions.$open(e);
                    }

                    $scope.reverse = function (data) {
                        console.log("@reverse", data);
                    }

                    $scope.loan_number = $routeParams.id;

                })

        /* Borrower Controller */
        .controller('borrower',
                function ($scope, $rootScope, $routeParams, $filter, $borrower,
                        $loan, $contact, $location, $application, $residence,
                        $pay_collection, $debts, $other_debts, $tabs,
                        $references, $automobiles, $collaterals, $phones,
                        $inquieries, $other_incomes, $transaction) {

                    $scope.employers = [];
                    $scope.residences = [];
                    $scope.debts = [];
                    $scope.other_debts = [];
                    $scope.references = [];
                    $scope.automobiles = [];
                    $scope.collaterals = [];
                    $scope.phones = [];
                    $scope.inquieries = [];
                    $scope.notes = [];
                    $scope.loans = [];

                    $scope.nsf = 25.00;

                    $scope.now = new Date();

                    $scope.residence = {
                        residence_ownership_type: '',
                        residence_verified_by: 1,
                        residence_verified_how: '',
                        residence_payment: '',
                        residence_how_long: '',
                        is_primary: true,
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        zip_four: '',
                        residence_type: ''
                    };
                    $scope.employer = {
                        payment_schedule_id: '',
                        how_verified: '',
                        how_verified_by: 1,
                        how_long: '',
                        employer_name: '',
                        address: '',
                        phone_number: ''
                    };
                    $scope.other_debt = {
                        creditor: '',
                        other_debt_type: '',
                        previous: '',
                        high_credit: '',
                        debt_value: '',
                        payment_schedule_type: '',
                        no_pay: false,
                        current_balance: '',
                        last_payment_made: '',
                        next_payment_due: '',
                        description: ''
                    };
                    $scope.debt = {
                        debt_type: '',
                        value: '',
                        description: '',
                        no_pay: ''
                    };
                    $scope.reference = {
                        last_name: '',
                        first_name: '',
                        middle_name: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        phone_number: '',
                        relationship_type: '',
                        phone_type: ''
                    };
                    $scope.automobile = {
                        make: '',
                        model: '',
                        color: '',
                        description: '',
                        vin_number: ''
                    };
                    $scope.collateral = {
                        description: '',
                        object_id: '',
                        object_value: '',
                        collateral_type: ''
                    };
                    $scope.phone_number = {
                        phone_number: '',
                        is_primary: '',
                        phone_type: ''
                    };

                    $scope.current = {
                        current_balance_renewal: 0,
                        current_balance_renewal_hi: 0,
                        current_ending_balance: 0,
                        current_iahc_refund: 0,
                        current_late_balance: 0,
                        current_maturity_interest: 0,
                        current_payoff: 0,
                        current_up_to_date: 0,
                        description: '',
                        total: 0
                    };

                    $scope.create = function (model, data, form) {

                        $tabs.post({account: $scope.borrower.account_number, page: model},
                        JSON.stringify(data), function (out) {
                            form.$reset();
                            $scope.refresh(model);
                        });
                    };

                    $scope.remove = function (model, e) {

                        var data = JSON.stringify($scope.grids[model].$get(e));

                        $tabs.delete({account: $scope.borrower.account_number, page: model},
                        data, function (out) {
                            $scope.refresh(model);
                        });
                    };

                    $scope.update = function (model, data) {
                        $tabs.put({account: $scope.borrower.account_number, page: model, num: data.id},
                        JSON.stringify(data), function (out) {
                            $scope.refresh(model);
                        });
                    };

                    $scope.open = function (model, e) {

                        $scope[model].$selected = $scope.grids[model].$open(e);
                    };

                    /* get dropdown data */
                    $application.get({
                        method: 'types'
                    }, function (types) {
                        $scope.dropdown = types;
                    });

                    $scope.changeDue = function (payment) {
                        var total = 0;
                        if (payment !== undefined) {
                            var a1 = payment.applied_to_nsf_charge !== undefined ? payment.applied_to_nsf_charge : 0;
                            var b1 = payment.applied_to_late_charge !== undefined ? payment.applied_to_late_charge : 0;
                            var c1 = payment.applied_to_balance !== undefined ? payment.applied_to_balance : 0;
                            var d1 = payment.applied_to_maturity_interest !== undefined ? payment.applied_to_maturity_interest : 0;
                            var e1 = payment.amount_tendered !== undefined ? payment.amount_tendered : 0;
                            total = (e1 - (a1 * 1 + b1 * 1 + c1 * 1 + d1 * 1));
                        }
                        return total;
                    };


                    $scope.$watch('payment.tender_type', function (newVal, oldVal) {
                        $scope.payment.applied_to_balance = '';
                        $scope.payment.applied_to_late_charge = '';
                        $scope.payment.applied_to_maturity_interest = '';
                        $scope.payment.applied_to_nsf_charge = '';
                        $scope.payment.check_number = '';
                        $scope.payment.amount_tendered = '';
                        $scope.payment.card_type = '';
                    });


                    $scope.payment = {
                        date: $filter('date')(new Date())
                    };

                    $scope.add_payment = function (payment) {

                        var data = {
                            account: $scope.borrower.account_number,
                            number: $scope.borrower.number_of_loans,
                            tender_type: payment.tender_type,
                            applied_to_balance: payment.applied_to_balance,
                            applied_to_late_charge: payment.applied_to_late_charge,
                            applied_to_maturity_interest: payment.applied_to_maturity_interest,
                            applied_to_nsf_charge: payment.applied_to_nsf_charge,
                            /*drawer_number: payment.drawer_number,*/
                            card_type: payment.card_type !== undefined ? payment.card_type : '',
                            check_number: payment.check_number !== undefined ? payment.check_number : ''
                        };


                        $pay_collection.payment(data, function (response, headers) {
                            console.log("$pay_collection_posted - " + payment.tender_type, response);

                            payment.applied_to_balance = '';
                            payment.applied_to_late_charge = '';
                            payment.applied_to_maturity_interest = '';
                            payment.applied_to_nsf_charge = '';
                            payment.check_number = '';
                            payment.amount_tendered = '';
                            payment.card_type = '';

                            /* show sucess message */
                            $rootScope.$notifications.push({
                                type: 'success',
                                title: 'Borrower Payment collection.',
                                message: 'The borrower payment collection data was posted succesfully.'
                            });

                            $('#modal-collection').modal('hide');

                            $loan.current({
                                account: $scope.borrower.account_number,
                                number: $scope.loan.loan_number
                            }, function (data) {
                                if (data.length > 0) {
                                    $scope.current = data[0];
                                    $scope.current.total = parseFloat($scope.current.current_maturity_interest) +
                                            parseFloat($scope.current.current_late_balance) +
                                            parseFloat($scope.current.current_up_to_date);
                                }
                            });

                            $transaction.query({
                                account: $scope.borrower.account_number,
                                number: $scope.loan.loan_number
                            }, function (transactions) {
                                $scope.grids.transactions.$data(transactions);
                            });
                        });
                    };

                    $scope.create_notes = function (note) {

                        note.date = $filter('date')(new Date());

                        var data = {
                            account: $scope.borrower.account_number,
                            number: $scope.borrower.number_of_loans,
                            content: note.content,
                            created_date: note.date
                        };

                        $contact.note(data, function (response, headers) {
                            console.log("@note", data);
                            //RELOAD/REFRESH THE GRID
                            var id = {
                                account: data.account,
                                number: data.number
                            };

                            $contact.query(id, function (notes) {
                                $scope.grids.notes.$data(notes);
                            });
                        });
                    };

                    $scope.nfs = {charge: 25.00, comment: ''};

                    $scope.add_nfs = function (nfs) {

                        $loan.nsf({account: $scope.borrower.account_number,
                            loan: $scope.loan.loan_number},
                        {charge: $scope.nfs.charge,
                            comment: $scope.nfs.comment}, function (data) {

                            $('#modal-nfs').modal('hide');

                            $rootScope.$notifications.push({
                                type: 'success',
                                title: 'nfs.',
                                message: 'The NFS charge as been added to the loan.'
                            });
                        });

                        console.log("@nfs", nfs);
                    };

                    $scope.writeoff = function () {
                        $loan.writeoff({account: $scope.borrower.account_number,
                            loan: $scope.loan.loan_number}, function (response) {

                            $('#modal-writeoff').modal('hide');

                            $rootScope.$notifications.push({
                                type: 'success',
                                title: 'Writeoff.',
                                message: 'The loan was written off succesfully.'
                            });

                            $location.path('/borrower/' + $routeParams.id);

                        }, function (error) {

                            var message = '';

                            for (var i = 0; i < error.data.length; i++) {
                                message += error.data[i];
                            }

                            $('#modal-writeoff').modal('hide');

                            $rootScope.$notifications.push({
                                type: 'danger',
                                title: 'Writeoff.',
                                message: 'The loan was not written off.'
                            });
                        });
                    }

                    $scope.open = function (model, e) {
                        $scope[model].$selected = $scope.grids[model].$open(e);
                    };

                    /* set template subviews */
                    $scope.templates = {
                        collection: "../common/modules/borrower/collection.html",
                        contact: "../common/modules/borrower/contact.html",
                        nfs: "../common/modules/borrower/nfs.html",
                        writeoff: "../common/modules/borrower/writeoff.html",
                        promise: "../common/modules/borrower/promise.html"
                    };
                    /* Save Demographic Data */
                    $scope.updateBorrower = function (data) {
                        var borrower = angular.copy(data);
                        borrower.account = borrower.account_number;
                        $borrower.update(borrower, function (response) {
                            /* show sucess message */
                            $rootScope.$notifications.push({
                                type: 'success',
                                title: 'Borrower Demographic.',
                                message: 'The borrower demographic data was updated succesfully.'
                            });
                            console.log("@borrower: updated", response);
                        })
                    };
                    /* get borrower data */
                    $scope.borrower = $borrower.get({
                        account: $routeParams.id
                    }, function (data) {

                        /* get borrower current loan */
                        $loan.get(
                                {account: data.account_number,
                                    number: data.number_of_loans},
                        function (loan) {

                            $scope.loan = loan;

                            $scope.balance_renewal = $loan.balance_renewal({account: data.account_number, loan: $scope.loan.loan_number});

                            $transaction.query({
                                account: data.account_number,
                                number: $scope.loan.loan_number
                            }, function (transactions) {
                                $scope.grids.transactions.$data(transactions);
                            });

                            $loan.current({
                                account: data.account_number,
                                number: $scope.loan.loan_number
                            }, function (data) {
                                if (data.length > 0) {
                                    $scope.current = data[0];
                                    $scope.current.total = parseFloat($scope.current.current_maturity_interest) +
                                            parseFloat($scope.current.current_late_balance) +
                                            parseFloat($scope.current.current_up_to_date);
                                }
                            });
                        });

                        /* get borrower loans */
                        $loan.query({
                            account: data.account_number
                        }, function (loans) {
                            $scope.grids.loan_history.$data(loans);
                        });

                        $contact.query({account: data.account_number,
                            number: data.number_of_loans
                        }, function (notes) {

                            $scope.grids.notes.$data(notes);
                        });

                        /* get borrower residences */
                        $tabs.query({
                            account: data.account_number,
                            page: 'references'},
                        function (references) {
                            $scope.references = references;
                            $scope.grids.references.$data($scope.references);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'debts'},
                        function (debts) {
                            $scope.debts = debts;
                            $scope.grids.debts.$data($scope.debts);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'residences'},
                        function (residences) {
                            $scope.residences = residences;
                            $scope.residence = $filter('filter')($scope.residences, 'is_primary', true);
                            $scope.grids.residences.$data($scope.residences);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'employers'},
                        function (employers) {
                            $scope.employers = employers;
                            $scope.employer = $scope.employers[0];
                            $scope.grids.employers.$data($scope.employers);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'automobiles'},
                        function (automobiles) {
                            $scope.automobiles = automobiles;
                            $scope.grids.automobiles.$data($scope.automobiles);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'phones'},
                        function (phones) {
                            $scope.phones = phones;
                            $scope.phone = $filter('filter')($scope.phones, 'is_primary', true);
                            $scope.grids.phones.$data($scope.phones);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'inquieries'},
                        function (inquieries) {
                            $scope.inquieries = inquieries;
                            $scope.grids.inquieries.$data($scope.inquieries);
                        });

                        $tabs.query({
                            account: data.account_number,
                            page: 'other_incomes'},
                        function (other_incomes) {
                            $scope.other_incomes = other_incomes;
                            $scope.grids.other_incomes.$data($scope.other_incomes);
                        });

                        $loan.rate(function (rates) {
                            $scope.rates = rates;
                        });
                    });

                    $scope.renew = function () {
                        $location.path('/loan/' + $routeParams.id + '/renew');
                    }

                    $scope.refresh = function (model) {
                        $tabs.query({
                            account: $scope.borrower.account_number,
                            page: model},
                        function (data) {
                            $scope[model] = data;
                            $scope.grids[model].$data($scope[model]);
                        });
                    }
                });