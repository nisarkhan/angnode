angular
  .module('sunloan')
  .directive('ngGridedit', function($parse, $path){

    return {
      restrict: 'AC',
      link: function(scope, elem, attrs) {

        scope.grids[attrs.ngGridedit].$editor = elem;

      }
    }

  })
  .directive('ngGridview',

    function($parse, $path, $compile, $storage, $interpolate, $timeout) {

      return {
          restrict: 'AC',
          link: function(scope, elem, attrs) {

              $injector = angular.element('html').injector();

              var id= 'gridview-'+attrs.ngGridview,
                  saved= $storage.get(id),
                  settings = {
                    'data': scope[attrs.ngModel] || {},
                    'oLanguage': {
                      'sSearch': 'Search: _INPUT_',
                      'sLengthMenu': attrs.title || 'Display _MENU_ items.',
                      'sInfo': 'Showing _START_ to _END_ of _TOTAL_ items.',
                      'sLoadingRecords': 'Please wait - loading...',
                      'sProcessing': '<div class="grid-loading"><img src="../assets/images/spinner.gif" width="32" align="middle" /> Loading</div>',
                      'sInfoEmpty': 'No entries to show'
                    },
                    'iDisplayLength': 10,
                    "lengthMenu": [ 5, 10, 20, 30, 50, 100 ],
                    'columnDefs': []
                  };

              var columns = angular.element('thead tr th', elem);

              if( columns.length > 0 ){
                  settings.aoColumns = [];
              }

              if( attrs.lengthchange ){
                settings.bLengthChange = $.parseJSON(attrs.lengthchange);
              }

              if(attrs.remote){

                  var url = $path.rest+attrs.remote;

                  settings.bProcessing = true;
                  settings.bServerSide = true;
                  settings.sAjaxSource = url;

                  if( attrs.resource ){

                    settings.deferRender = true;
                    settings.preDrawCallback = function( settings) {
                      var resource = $injector.get(attrs.resource),
                          collection = angular.fromJson(settings.aoData);
                      angular.forEach(collection, function(item, idx) {
                          collection[idx]._aData = new resource(item._aData);
                      });

                    };
                  }

              };

              if( attrs.filter){
                settings.oSearch = {
                  sSearch : attrs.filter
                };
              }

              $.each(columns, function(index){

                var name = $(this).data('name'),
                    column = { 'mData': name || null },
                    render = $(this).data('render'),
                    type = $(this).data('type'),
                    width = $(this).data('width');

                if( render ){

                  column.mRender = function(value, type, data){
                    return $interpolate(render)(data);
                  };

                }

                if( name && name[0] == '$' ){
                  settings.columnDefs.push({
                    "targets": index,
                    "createdCell": function (td, cellData, rowData, row, col) {
                      $(td).empty().append(cellData);
                    }
                  });
                }

                if( type ){
                  column.sType = type;
                }

                if( width ){
                  column.sWidth = width;
                }
                settings.aoColumns.push(column);

              });

              settings.rowCallback = function(row, data, index){

                if(!row.$compiled){
                  row.$compiled = true;
                  $compile(row)(scope);
                }
              }

              elem.$save = true;
              settings.drawCallback = function(){

                var data = this.fnGetData();
                if( attrs.change && elem.$save ){
                  var fn = $parse(attrs.change)(scope);
                  if( typeof fn == 'function') fn(data);
                }
              }

              elem.$get_checked = function(){}

              elem.$refresh = function( params ){

                if( params ){

                  this.on('preXhr.dt', function ( e, settings, data ) {
                      angular.forEach(params, function(value, index){
                        data[index] = value;
                      });
                  });

                }
                scope.grids[attrs.ngGridview].fnReloadAjax();

              }

              elem.$delete = function(e){

                var row = angular.element(e.target).parents('tr')[0],
                    position = scope.grids[attrs.ngGridview].fnGetPosition(row);

                scope.grids[attrs.ngGridview].fnDeleteRow( position );
              }

              var last_open = false;

              elem.$add = function(data){

                var item = angular.copy(data);
                if( attrs.resource ){
                  var resource = $injector.get(attrs.resource);
                  item = new resource(item);
                }
                scope.grids[attrs.ngGridview].fnAddData(item);
              }

              elem.$update = function( data){

                last_open[0].$compiled = false;
                scope.grids[attrs.ngGridview].fnUpdate( data, last_open);
                scope.grids[attrs.ngGridview].fnClose(last_open);

              }

              elem.$data = function( data ){

                elem.fnClearTable();
                angular.forEach(data, function(item, index){
                  elem.$add(item);
                  if( index+1 == data.length){
                    elem.$save = true;
                  }
                });
              }

              elem.$get = function(e){

                var row = angular.element(e.target).parents('tr');
                return scope.grids[attrs.ngGridview].fnGetData(row);
              }

              elem.$open = function(e){

                e.stopPropagation();

                var row = angular.element(e.target).parents('tr'),
                    data = scope.grids[attrs.ngGridview].fnGetData(row);

                if ( scope.grids[attrs.ngGridview].fnIsOpen(row) ) {

                  scope.grids[attrs.ngGridview].fnClose(row);

                } else {

                  if( last_open ){
                    scope.grids[attrs.ngGridview].fnClose(last_open);
                  }

                  scope.grids[attrs.ngGridview].fnOpen( row, scope.grids[attrs.ngGridview].$editor.removeClass('no-show'));
                  last_open  = row;
                }

                return data;
              }

              elem
                .attr('id', 'gridview-'+attrs.ngGridview)
                .attr('width', '100%')
                .attr('cellspacing', 0)
                .addClass('table table-striped table-bordered');

              scope.grids[attrs.ngGridview] = elem.dataTable(settings);

              if(attrs.data){

                scope.$watch(attrs.data, function(data){
                  if(typeof data == 'object'){
                    elem.$save = false;
                    elem.$data(data);
                  }
                });
              }

          }
      };

  })
