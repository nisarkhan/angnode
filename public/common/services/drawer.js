'use strict';
/* Drawer Service */
angular
  .module('sunloan')
  .factory('$drawer', function($resource, $response, $path) {
    
    var $drawer = $resource($path.rest + '/rest/drawer/:id', 
        {}, {
        all: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data, header) {
              return $response
                      .to_resource(data, $drawer);
            }
        }
    });

    $drawer.prototype.$options = function(data, type){

      var self = this,
          buttons = $('<div class="table-buttons">'),
          transfer = $('<a class="btn btn-white btn-sm" data-dismiss="modal"> <i class="fa fa-money"></i> Transfer</a>'),
          edit = $('<a class="btn btn-white btn-sm" data-dismiss="modal"> <i class="fa fa-pencil"></i> Edit</a>');

      transfer.on("click", function(){
        window.location = '#/drawer/cash_transfer/'+self.drawer_number;
      });

      edit.on("click", function(){
        window.location = '#/drawer/edit/'+self.drawer_number;
      });

      return buttons.append(transfer, edit);

    };

    return $drawer;

});