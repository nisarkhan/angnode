'use strict';
/* Line Service */
angular
  .module('sunloan')
  .factory('$collect', function($resource, $response, $path) {

    var $collect = $resource(
        '',
        null,
        {
          all: {
            url: '../common/json/collect.json',
            method: 'GET',
            isArray: true
          }
        });

    $collect.prototype.$check = function(){  
      return '<div class="checkbox"><input id="checkbox-'+this.id+'" type="checkbox" value="'+this.id+'"/><label for="checkbox-'+this.id+'"></label></div>';
    };   
    return $collect;

});

 