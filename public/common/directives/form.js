angular
  .module('sunloan')
  .directive('ngValidate',

    function ($parse) {
        return {
            compile: function compile(tElement, tAttrs, transclude) {
                return {

                    post: function postLink(scope, element, iAttrs, controller) {
                        
                        var form = element.controller('form');
                        form.$submitted = false;
                        var fn = $parse(iAttrs.ngValidate);

                        form.$submit = function(e) {
                            
                            element.addClass('ng-submitted');
                            form.$submitted = true;
                            if(form.$valid) {
                              fn(scope, { $event: e});
                            }
                        };

                        form.$reset = function(e){

                            element[0].reset();
                            form.$submitted = false;
                            form.$setPristine();
                            element.removeClass('ng-submitted');

                            angular.forEach(form, function(input){
                                 
                                if( input.$viewValue ){   
                                    input.$setViewValue('');
                                }
                            })


                        };
                        
                        element.on('submit', function(event) {
                            event.preventDefault();
                            scope.$apply(form.$submit);
                        });
                        
                        /*
                        scope.$watch(function() { return form.$valid}, function(isValid) {
                            if(form.$submitted == false) return;
                            if(isValid) {
                                element.removeClass('has-error').addClass('has-success');
                            } else {
                                element.removeClass('has-success');
                                element.addClass('has-error');
                            }
                        });*/
                    }
                }
            }
        }
    })