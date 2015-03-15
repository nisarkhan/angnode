'use strict';
angular
        .module('sunloan')
        .filter('sumDocTender', function () {

            return function (data, type) {

                var total = 0.00;

                if (Array.isArray(data)) {
                    
                    angular.forEach(data, function(tender){
                        if(tender.type === type){
                            total += tender.value
                        }
                    });
                }

                return total;
            };
        });

