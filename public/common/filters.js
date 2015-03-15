'use strict';
angular
  .module('sunloan')
  .filter('percent', function() {
    
    return function(data){
      if(!data){
        data = 0;
      }
      return (data * 100).toFixed(2);
    };

  });

/*display -$10.00 rather than ($10.00)?*/
angular
  .module('sunloan')  
  .filter('customCurrency', ["$filter", function ($filter) {       
    return function(amount, currencySymbol){
        var currency = $filter('currency');         

        if(amount < 0){
            return currency(amount, currencySymbol).replace("(", "-").replace(")", ""); 
        }
        return currency(amount, currencySymbol);
    };
}]);


