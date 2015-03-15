angular
  .module('sunloan')
  .directive('a', function() {
      return {
          restrict: 'E',
          link: function(scope, elem, attrs) {
              if(attrs.toggle){
                  elem.on('click', function(e){
                      e.preventDefault();
                  });
              }
          }
     };
  })
  .directive('ngTooltip',
    function($parse, $timeout){

      return {
        restrict : 'A',
        link : function(scope, elem, attrs){
          
          elem
            .attr('title', attrs.ngTooltip)
            .attr('viewport', 'body');
          
          elem.tooltip();
 
        
        }
      };

  })
  .directive('ngDatepicker',
    function($parse){

      return {
        restrict : 'A',
        link : function(scope, elem, attrs){
          
          elem
            .datepicker({
              todayBtn: "linked",
              //autoclose: true,
              todayHighlight: true
            });
        }
      };

  })
  .directive('ngMask', 

    function($parse, $mask, $timeout){

      return {
        restrict : 'A',
        link : function(scope, elem, attrs){
            
            var template = attrs.ngMask,
                options = {};

            if($mask[attrs.ngMask]){
              template = $mask[attrs.ngMask].mask;  
              options = $mask[attrs.ngMask].options || {};  
            }  
            /*  
            if(attrs.ngModel){
              elem.on('keyup', function(){
                var self = this;
                $timeout(function(){
                  scope.$apply(attrs.ngModel+'="'+self.value+'"');
                }, 100);
              })
            }*/  
            elem.mask(template, options);

        }
      };

  })
  .value('$mask', {
    currency: { mask :'#,##0.00', options : { reverse: true, maxlength: false } },
    number: { mask: '0#', options: { maxlength: false } },
    date: { mask: '00/00/0000' },
    phone: { mask: '(000)000-0000' },
    ssn: { mask : '000-00-0000'},
    time: { mask: '00:00:00'},
    zip: { mask: '00000' }
  })
  
  /*numbers only - add by nisar khan */
  .directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue === undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9+.]/g, ''); 
           if (transformedInput!==inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});

  