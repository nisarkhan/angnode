angular
  .module('sunloan')
  .directive('ngDropdown',

    function($parse, $timeout, $path, $interpolate, $timeout) {

      return {
          restrict: 'AC',
          controller: function($scope){

            $scope.dropdown = null;
          },
          link: function(scope, elem, attrs, ctlr) {

              var button = $('<div class="btn-group">'+
                              '<button type="button" class="btn btn-white dropdown-label" data-toggle="dropdown">Select...</button>'+
                              '<button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">'+
                                '<i class="fa fa-angle-down"></i>'+
                                '<span class="sr-only">Toggle Dropdown</span>'+
                              '</button>'+
                              '<ul class="dropdown-menu fx-slidedown" role="menu"></ul>'+
                            '</div>');

              var menu = $(".dropdown-menu", button),
                  label = $(".dropdown-label", button);

              menu.css({ height: 'auto', maxHeight : 300, overflowX: 'hidden', overflowY: 'auto'});

              elem.hide();
              elem.after(button);

              //var size = button.parent().width();
              button.find('button').eq(0).css({ maxWidth : '82.5%', textAlign: 'left' });

              elem
                .on("focus", function(){
                  button.dropdown('toggle');
                });

              if(attrs.ngModel){

                scope.$watch(attrs.ngModel, function(value){
                  if( typeof value != 'undefined' ){
                    ctlr.select(value);
                  }else{
                    label.html('Select...');
                    elem.val(null);
                  }
                });

              };

              ctlr.update = function(value){
                $timeout(function(){
                  scope.$apply(attrs.ngModel+'="'+value+'"');
                }, 0);
              };

              ctlr.select = function(value){

                ctlr.selected = value;
                elem.val( value);
                label.html( elem.find('option:selected', elem).html());
              };

              ctlr.add = function( option){
                menu.append( option);
              };

              ctlr.remove = function( option, value){
                if( elem.val() == value){
                  label.html('Select...');
                }
                option.remove();
              };


          }
      };

  })
  .directive('ngOption',

    function($parse, $timeout){

      return {
        restrict : 'AC',
        require: '^ngDropdown',
        link : function(scope, element, attributes, controller){

            $timeout(function(){

                var name = element.html(),
                    value = element.val(),
                    option = $('<li><a class="easing" href="javascript:void(0);">'+name+'</a></li>');

                option.unbind("click").on("click", function(){
                  $(this).addClass("active").siblings().removeClass("active");
                  controller.update(value);
                });

                controller.add(option);

                scope.$on("$destroy",function() {
                  controller.remove(option, value);
                });

                if( (controller.selected == value) || element.attr('selected')){
                  controller.select(value);
                  option.trigger("click");
                };

            }, 0);

        }
      };
  })
