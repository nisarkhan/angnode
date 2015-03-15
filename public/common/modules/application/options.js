'use strict';
/* Dashboard Controller */

angular
    .module('sunloan')
    .controller('application.options',
        function($scope, $rootScope, $routeParams, $timeout, $location, $storage, $application, $residence, $employers) {

            //ui-select :::initialize:::
            $scope.ddl_ownership_type = {};
            $scope.ddl_source = {};
            $scope.ddl_identification_type = {};
            //borrower:
            $scope.ddl_prefix = {};
            $scope.ddl_suffix = {};
            $scope.ddl_phone_type = {};
            $scope.ddl_number_of_dependents = {};
            //tab edit
            $scope.ddl_res_state =  {};
            //$scope.ddl_res_how_long = {};
            //tab phone
            $scope.ddl_tab_phone_type = {}; //ddl_tab_phone_type
            
            //ui-select :::clear the selected value:::
            $scope.clear = function($event, model) {
                //$event.stopPropagation();
                $scope.clearme(model);
            };
            $scope.residences = [];
            $scope.employers = [];
            $scope.debts = [];
            $scope.other_debts = [];
            $scope.references = [];
            $scope.automobiles = [];
            $scope.collaterals = [];
            $scope.phones = [];

            $scope.application = {
                residences: [],
                employers: [],
                debts: [],
                other_debts: [],
                references: [],
                automobiles: [],
                collaterals: [],
                phones: []
            }
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

            $scope.refresh = function() {
                $scope.application = $application.get({
                    method: $routeParams.id
                }, function(response) {
                    if (!'id' in response)
                        $location.path('application');

                    $scope.update_ui_select_dropdown();

                    $scope.employers = $scope.application.employers ? $scope.application.employers : [];
                    $scope.debts = $scope.application.debts ? $scope.application.debts : [];
                    $scope.other_debts = $scope.application.other_debts ? $scope.application.other_debts : [];
                    $scope.residences = $scope.application.residences ? $scope.application.residences : [];
                    $scope.automobiles = $scope.application.automobiles ? $scope.application.automobiles : [];
                    $scope.collaterals = $scope.application.collaterals ? $scope.application.collaterals : [];
                    $scope.references = $scope.application.references ? $scope.application.references : [];
                    $scope.phones = $scope.application.phones ? $scope.application.phones : [];
                    $scope.other_incomes = $scope.application.other_incomes ? $scope.application.other_incomes : [];

                    $scope.grids['employers'].$data($scope.employers);
                    $scope.grids['debts'].$data($scope.debts);
                    //$scope.grids['other_debts'].$data($scope.other_debts);
                    $scope.grids['references'].$data($scope.references);
                    $scope.grids['automobiles'].$data($scope.automobiles);
                    //$scope.grids['collaterals'].$data($scope.collaterals);
                    $scope.grids['residences'].$data($scope.residences);
                    $scope.grids['phones'].$data($scope.phones);
                    $scope.grids['other_incomes'].$data($scope.other_incomes);
                    console.log("@application", $scope.application);

                    //load residence data when the page loads - nk
                    $scope.residence = $scope.application['residences'] ? $scope.application['residences'][0] : {};
                });
            };

            $scope.refresh();


            /* Nisar Khan: 12/12/2014  
             * this code is only specific to review update:
             * */
            /* set review template subviews */
            $scope.reviewtemplates = [
                '../common/modules/review/create.html',
                '../common/modules/review/borrower.html'
            ];

            $scope.review_update = function(application) {

                var data = angular.copy($scope.application);
                //grab the updated value (if any) from the ui-select dropdown
                var application = $scope.update_payload_data(data);

                var data = angular.copy(application);
                data.method = $scope.application.id;

                $application.update(data, function(response, headers) {
                    console.log("@review application", response);
                    /* show sucess message */
                    $rootScope.$notifications.push({
                        type: 'success',
                        title: 'Borrower Application.',
                        message: 'The borrower application changes was updated succesfully.'
                    });
                });
            };

            $scope.add_phone = function(form, phone) {
                //ui-select :::load selected value:::
                if ($scope.ddl_phone_type !== undefined)
                    phone.phone_type = $scope.ddl_phone_type.selected.name;

                var data = angular.copy(phone);
                if ($scope.application.phones) {
                    $scope.application.phones.push(data);
                } else {
                    $scope.application.phones = [data];
                }
                form.$reset();
            };

            $scope.remove_phone = function(index) {
                $scope.application.phones.splice(index, 1);
            };

            /* review update ends*/

            $scope.create = function(model, data, form) {

                if ($scope.application[model]) {
                    $scope.application[model].push(data);
                } else {
                    $scope.application[model] = [];
                    $scope.application[model].push(data);
                }

                $application.update({
                        method: $scope.application.id
                    },
                    $scope.application,
                    function(data) {
                        form.$reset();
                        $scope.refresh();
                    });
            };

            $scope.remove = function(model, e) {

                var data = JSON.stringify($scope.grids[model].$get(e));

                if ($scope.application[model]) {

                    for (var i = 0; i < $scope.application[model].length; i++) {
                        var find = JSON.stringify($scope.application[model][i]);
                        if (data === find) {
                            $scope.application[model].splice(i, 1);
                            continue;
                        }
                    }

                    $application.update({
                            method: $scope.application.id
                        },
                        $scope.application,
                        function(data) {
                            $scope.refresh();
                        });

                }
            };

            $scope.update = function(model, data) {

                if ($scope.grids[model]) {

                    var old = JSON.stringify($scope[model].old);
                    for (var i = 0; i < $scope.application[model].length; i++) {
                        var find = JSON.stringify($scope.application[model][i]);
                        if (find === old) {
                            $scope.application[model][i] = data;
                            continue;
                        }
                    }

                    $application.update({
                            method: $scope.application.id
                        },
                        $scope.application,
                        function(data) {
                            $scope.refresh();
                        });
                }
            };

            $scope.open = function(model, e) {
                $scope[model].$selected = $scope.grids[model].$open(e);
                //$scope.update_ui_select_dropdown();
                /*if($scope[model].$selected !== undefined)
                {
                    if ($scope[model].$selected.state !== undefined)
                    { 
                      $scope.ddl_res_state.selected = { name: $scope[model].$selected.state};
                    }
                    if ($scope[model].$selected.phone_type !== undefined)
                    {                         
                        $scope.ddl_tab_phone_type.selected = { name: $scope[model].$selected.phone_type};
                    }
                    if ($scope[model].$selected.how_long !== undefined)
                    {
                      $scope.ddl_res_how_long.selected = { name: $scope[model].$selected.how_long };
                    }
                }*/

                $scope[model].old = angular.copy($scope.grids[model].$get(e));
            };

            $scope.submit = function() {

                var application = angular.copy($scope.application);
                application.status = 'Under review';
                application.method = application.id;

                $application
                    .update(application, function(response) {
                        $location.path('/');
                    });

            };

            $scope.exit = function() {
                $location.path('/');
            };

            $scope.dropdownstates = function() {
                $scope.dropdownstates = $scope.dropdown.states;


            };
            /* get dropdown data */
            $application.get({
                method: 'types'
            }, function(types) {
                $scope.dropdown = types;

            });

            /*ui-select*/

            $scope.numberofdependents = [{
                value: '0',
                name: 'No dependents'
            }, {
                value: '1',
                name: '1 Dependent'
            }, {
                value: '2',
                name: '2 Dependents'
            }, {
                value: '3',
                name: '3 Dependents'
            }, {
                value: '4',
                name: '4 Dependents'
            }, {
                value: '5',
                name: '5 Dependents'
            }, {
                value: '6',
                name: '6 Dependents'
            }, {
                value: '7',
                name: '7 Dependents'
            }, {
                value: '8',
                name: '8 Dependents'
            }, {
                value: '9',
                name: '9 Dependents'
            }, {
                value: '10',
                name: '10 Dependents'
            }, {
                value: '11',
                name: '11 Dependents'
            }, {
                value: '12',
                name: '12 Dependents'
            }, {
                value: '13',
                name: '13 Dependents'
            }, {
                value: '14',
                name: '14 Dependents'
            }, {
                value: '15',
                name: '15 Dependents'
            }, {
                value: '16',
                name: '16 Dependents'
            }, {
                value: '17',
                name: '17 Dependents'
            }, {
                value: '18',
                name: '18 Dependents'
            }, {
                value: '19',
                name: '19 Dependents'
            }, {
                value: '20',
                name: '20 Dependents'
            }];

            $scope.clearme = function(model) {

                if (model === 'ownership_type') {
                    $scope.ddl_ownership_type = undefined;
                    $scope.ddl_ownership_type = {};
                } else if (model === 'source') {
                    $scope.ddl_source = undefined;
                    $scope.ddl_source = {};
                } else if (model === 'identification_type') {
                    $scope.ddl_identification_type = undefined;
                    $scope.ddl_identification_type = {};
                } else if (model === 'prefix') {
                    $scope.ddl_prefix = undefined;
                    $scope.ddl_prefix = {};
                } else if (model === 'suffix') {
                    $scope.ddl_suffix = undefined;
                    $scope.ddl_suffix = {};
                } else if (model === 'ddl_number_of_dependents') {
                    $scope.ddl_number_of_dependents = undefined;
                    $scope.ddl_number_of_dependents = {};
                } else if (model === 'phone_type') {
                    $scope.ddl_phone_type = undefined;
                    $scope.ddl_phone_type = {};
                }
            };
            $scope.update_payload_data = function(data) {
                //ui-select :::new selected value assign to applicaiton before it saves new value:::
                //application
                data.ownership_type = $scope.ddl_ownership_type.selected.name;
                data.source = $scope.ddl_source.selected.name;
                data.identification_type = $scope.ddl_identification_type.selected.name;
                /*if ($scope.ddl_ownership_type.selected !== undefined)
                    data.ownership_type = $scope.ddl_ownership_type.selected.name;
                if ($scope.ddl_source.selected !== undefined)
                    data.source = $scope.ddl_source.selected.name;
                if ($scope.ddl_identification_type.selected !== undefined)
                    data.identification_type = $scope.ddl_identification_type.selected.name;*/

                //borrower
                if ($scope.ddl_prefix.selected !== undefined)
                    data.prefix = $scope.ddl_prefix.selected.name;
                if ($scope.ddl_suffix.selected !== undefined)
                    data.suffix = $scope.ddl_suffix.selected.name;
                //data.number_of_dependents = $scope.ddl_number_of_dependents.selected !== undefined ? data.number_of_dependents : $scope.ddl_number_of_dependents.selected.name;
                return data;
            }

            $scope.update_ui_select_dropdown = function() {
                //ui-select :::load selected value from db::: 
                if ($scope.application.ownership_type !== undefined)
                    $scope.ddl_ownership_type.selected = {
                        name: $scope.application.ownership_type
                    };
                if ($scope.application.source !== undefined)
                    $scope.ddl_source.selected = {
                        name: $scope.application.source
                    };
                if ($scope.application.identification_type !== undefined)
                    $scope.ddl_identification_type.selected = {
                        name: $scope.application.identification_type
                    };
                //borrower:          
                if ($scope.application.prefix !== undefined && $scope.application.prefix !== ' ')
                    $scope.ddl_prefix.selected = {
                        name: $scope.application.prefix
                    };
                if ($scope.application.suffix !== undefined && $scope.application.suffix !== ' ')
                    $scope.ddl_suffix.selected = {
                        name: $scope.application.suffix
                    };
                if ($scope.application.number_of_dependents !== undefined)
                    $scope.ddl_number_of_dependents.selected = {
                        name: $scope.application.number_of_dependents
                    };
                 
                //tab residence:
                if ($scope.application.residences[0] !== undefined)
                    $scope.ddl_res_state.selected = {
                        name: $scope.application.residences[0].state
                    };
            }
        });