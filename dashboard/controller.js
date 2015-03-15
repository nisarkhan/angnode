'use strict';
angular.module('sunloan')
        .controller('dashboard', function ($rootScope, $scope, $storage, $timeout, $location, $drawer, $application, $callroute, $delinquency, $filter) {

            $scope.today = new Date();
            $scope.applications = {
                not_completed: [],
                under_review: [],
                approved: []
            };

            /* set template subviews */
            $scope.templates = {
                stream: "dashboard/stream.html",
                modal: "dashboard/drawer.html",
                loan: "dashboard/make_loan_confirm.html"
            };

            //$application.update({ method: 11, status: 'Under review' });
            //$application.delete({ id: 21 });

            /* get drawers data and fill the datatable */
            $drawer.all(function (drawers) {
                $scope.drawers = drawers;
            });

            /* get applications by statuses */
            $application.query({status: "Not completed"}, function (rows) {
                $scope.applications.not_completed = rows;
            });

            $application.query({status: "Under review"}, function (rows) {
                $scope.applications.under_review = rows;
            });

            $application.query({status: "Approved"}, function (rows) {
                $scope.applications.approved = rows;
            });

            /*
             $delinquency.metrics(function(metrics){
             console.log("@metrics", metrics);
             $scope.metrics = metrics;
             });*/

            $scope.metrics = [{
                    "delinquencyLatencyTypeEnum": "slow",
                    "balance": 310897.40,
                    "count": 413,
                    "id": 2
                }, {
                    "delinquencyLatencyTypeEnum": "30s",
                    "balance": 59154.66,
                    "count": 98,
                    "id": 3
                }, {
                    "delinquencyLatencyTypeEnum": "60s",
                    "balance": 33498.26,
                    "count": 61,
                    "id": 4
                }, {
                    "delinquencyLatencyTypeEnum": "90s",
                    "balance": 25787.86,
                    "count": 45,
                    "id": 5
                }, {
                    "delinquencyLatencyTypeEnum": "91+",
                    "balance": 183656.01,
                    "count": 324,
                    "id": 6
                }];

            /* @Events */
            $scope.make_loan = function (e) {
                var data = $scope.grids.approved.$get(e);
                $location.path('/loan/' + data.id + '/rate');
            };

            /* review application */
            $scope.open = function (grid, e, section) {
                var data = $scope.grids[grid].$get(e);
                $location.path('/application/' + data.id + (section ? '/' + section : ''));
            };

            /* manage call routes:loan */
            $scope.manage = function (e) {
                var data = $scope.grids.routes.$get(e);
                console.log("@loan", data);
                $location.path('/borrower/' + data.account_number).replace( );
            };

            $scope.close = function (e) {
                var data = $scope.grids.routes.$get(e);
                var assigned = {id: data.assigned_id, loan_id: data.loan_id, status: 'Complete', employee_id: data.employee_id};
                $callroute.update(assigned, function (data) {
                    console.log(data);
                    $scope.filter('Assigned');
                });
            }

            /* filter call routes */
            $scope.filter = function (status) {

                var query = { /*, assigned_status: status*/status: status};
                if (status == 'Assigned') {
                    //query.assigned_to = $rootScope.user.id;
                    query.employee_id = $rootScope.user.id;
                }

                $callroute.$assigned.get({employee_id: $rootScope.user.id},
                function (data) {
                    $scope.routes = $filter('filter')(data, {type_name:status});
                });

                $scope.route_status = status;
            };

            /* get call routes: Assigned   */
            $scope.filter('Assigned');


        });
