'use strict';
/* Dashboard Controller */

angular
        .module('sunloan')
        .controller('application.decline', function ($scope, $routeParams, $rootScope, $location, $storage, $application, $path, $window) {

            $scope.application = $application.get({method: $routeParams.id}, function (response) {
                if (!'id' in response)
                    $location.path('application');
            });

            $application.get({method: 'types'}, function (types) {
                $scope.types = types;
            });

            $scope.save = function () {

                var data = angular.copy($scope.application);

                $application
                        .update(angular.extend(data, {status: 'Declined', method: data.id}), function (response, headers) {

                            if (response.status == 'Declined') {

                                $rootScope.$notifications.push({
                                    type: 'success',
                                    title: 'Application Declined.',
                                    message: 'The loan application was succesfully denied.'
                                });
                                $location.path('/');
                            }
                        });
            };
            
            $scope.letter = function(){
                var url = $path.rest + '/rest/application/'+$scope.application.id+'/letter/3';
                $window.open(url);
            }
        });
