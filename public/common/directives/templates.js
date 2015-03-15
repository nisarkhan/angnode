angular
  .module('sunloan')

  .directive('sunHeader', function($path) {
    return {
      restrict: 'E',
      templateUrl: $path.template+'header.html'
    };
  })

  .directive('sunNotification', function($path) {
    return {
      restrict: 'E',
      templateUrl: $path.template+'notification.html'
    };
  })

  .directive('sunTab', function($parse, $path) {
    return {
      restrict: 'EA',
      templateUrl : function(elem, attrs){
        var template = 'index';
        if(attrs.template){
          template = attrs.template;
        }
        return $path.template+attrs.id+'/'+template+'.html';
      }
    };
  })

  .directive('sunForm', function($path) {
    return {
      restrict: 'EA',
      scope: {
        $edit: '@edit',
        data : '=data'
      },
      templateUrl : function(elem, attrs){
        var template = 'edit';
        if(attrs.template){
          template = attrs.template;
        }
        return $path.template+attrs.form+'/'+template+'.html';
      }
    };
  })

  /* Application */
  .directive('applicationTabs', function($path) {
    return {
      restrict: 'E',
      scope:{
        application : '=application',
        active : '@active'
      },
      templateUrl: '../common/modules/application/tabs.html'
    };
  });
