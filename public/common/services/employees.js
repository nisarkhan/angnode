'use strict';
/* Employees Service */
angular
  .module('sunloan')

  .factory('$employees', function($resource, $response, $path) {

      var $employees = $resource($path.rest + '/rest/employee/:id', {id: '@id'},
      {
                  all: {
                       method: 'GET',
                       isArray: true
                   },
                   update : {
                      url: $path.rest + '/rest/employee/:id',
                      method: 'PUT',
                      params: {
                          method: "@id" 
                      }                       
                    },
                    delete: {
                        url: $path.rest + '/rest/employee/:id',
                        method: 'DELETE',
                        params: {
                            id: "@id"
                        }                       
                    }

                  });

      $employees.prototype.$options = function () {

          return '<div class="table-buttons">' +
                   '<a class="btn btn-white btn-sm" ng-click="open(\'employees\',$event)"> <i class="fa fa-pencil"></i> Edit</a>' +
                   '<a class="btn btn-white btn-sm" ng-click="remove(\'employees\', $event)"> <i class="fa fa-trash-o"></i> Remove</a>' +
                 '</div>';
      }
      return $employees;

  })   
  
   