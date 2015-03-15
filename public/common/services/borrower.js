'use strict';
/* Borrower Service */
angular
        .module('sunloan')
        .factory('$borrower', function ($resource, $path) {

            var $borrower = $resource($path.rest + '/rest/borrower/:account', {account: '@account'},
            {
                update: {
                    params: {account: "@account"},
                    method: "PUT"
                },
                updatetab: {
                    url: $path.rest + '/rest/borrower/:account/:page',
                    method: 'PUT',
                    params: {
                        account: '@account',
                        page: "@page"
                    }
                }
            });

        $borrower.prototype.$options = function(){
            return '<div class="table-buttons">'+
                     '<a href="#/borrower/'+this.$account().number+'" class="btn btn-white btn"> <i class="fa fa-pencil"></i> Manage</a>'+
                   '</div>';
        };     
 
            $borrower.prototype.$account = function () {
                /* match '1234-5' and '1234' */
                if (this.account_number) {
                    var m = this.account_number.match(/^(\w+)(?:-(\w+))?$/);
                    if (m)
                        return {number: m[1], loan: m[2]};
                }
                
                return 0;
            };

            $borrower.prototype.$options = function () {
                return '<div class="table-buttons">' +
                        '<a href="#/borrower/' + this.$account().number + '" class="btn btn-white btn"> <i class="fa fa-pencil"></i> Manage</a>' +
                        '</div>';
            };

            return $borrower;

        });
 
    