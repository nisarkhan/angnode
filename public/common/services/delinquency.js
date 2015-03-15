'use strict';
angular
  .module('sunloan')
  .factory('$delinquency', function($resource, $response, $path) {

        function guid() {
           function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
          return _p8() + _p8(true) + _p8(true) + _p8();
        }
        
    var $delinquency = $resource($path.rest + '/rest/delinquency/:action', null, {
          metrics: {
              url:$path.rest + '/rest/delinquency/:action/metrics',
            method: 'GET',
            params: { action: '@action' },
            isArray: true
          },
          recency: {
            url: $path.rest + '/rest/delinquency/recency/:type',
            method: 'GET',
            isArray: true,
            params: { type: '@type' }
          },
          unassigned:{
            url: $path.rest + '/rest/delinquency/recency/:type/unassigned',
            method: 'GET',
            isArray: true,
            params: { type: '@type' }
              
          }
        });

    $delinquency.prototype.$manage = function(){
      return '<div class="table-buttons">'+
               '<a class="btn btn-white btn-sm" ng-click="manage($event);"> <i class="fa fa-pencil"></i> Manage</a>'+
             '</div>';
    };

    $delinquency.prototype.$check = function(){
        var id = guid();
      return '<div class="checkbox"><input id="checkbox-'+id+'" type="checkbox" value="'+id+'"/><label for="checkbox-'+id+'"></label></div>';
    };

    return $delinquency;
});
