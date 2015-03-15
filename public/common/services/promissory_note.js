'use strict';
/* Loan Service */
angular
        .module('sunloan')

        .factory('$promissory_notes', function ($resource, $response, $path) {

            var $promissory_notes = $resource($path.rest + '/rest/borrower/:account/promissory-note/:seq',
                    {account: '@account', seq: '@seq'},
            {
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                put: {
                    method: 'put'
                },
                post: {
                    method: 'POST'
                },
                pdf: {
                    url: $path.rest + '/rest/borrower/:account/promissory-note/:seq' + '.pdf'
                }


            });

            return $promissory_notes;

        })