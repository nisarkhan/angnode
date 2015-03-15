'use strict';
/* Payment Collection Service */
angular
  .module('sunloan')   
  .factory('$pay_collection', function($resource, $response, $path) {
      
       var $pay_collection = $resource($path.rest+'/rest/borrower/:account/loan/:number/payment', {},
                  {                    
                    payment: {                        
                      url : $path.rest+'/rest/borrower/:account/loan/:number/payment',
                      params: {
                        account : '@account', 
                        number : '@number'
                      },                       
                      method: 'POST'
                    }
                  });       
      return $pay_collection;
  })
 