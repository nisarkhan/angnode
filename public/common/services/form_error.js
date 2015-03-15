'use strict';
/**
 * This service is used to match the server error to the form element.
 */
angular
        .module('sunloan')
        .factory('$form_error', function() {
          
          function snake_case(name) {
            var separator = '_';
            return name.replace(/[A-Z]/g, function(letter, pos) {
              return (pos ? separator : '') + letter.toLowerCase();
            });

          }
          
          
          return function(form, response) {
            var errors;
                    
            if(response.data) {
              
              errors = response.data;
              
              angular.forEach(errors, function(error) {
                
                if(typeof error === 'object') {
                
                  if(error.path) {
                    
                    var elms = error.path.split('.');
                    var last = elms.pop();
                    var elmName = snake_case(last);

                    if(form[elmName]) {
                      form[elmName].$setValidity('serverValidation', false);
                      form[elmName].$error.serverValidationMessage = error.message;
                    } else {
                      console.warn('form_server.js: attempting to set error to undefined form element \'' + elmName + '\' on form \'' + form.$name + '\'.  Fix by assigning \'name="' + elmName + '"\' to element and ng-model to chosen model variable');
                    }

                  }

                }
                
              });

              }
            
          };
        });