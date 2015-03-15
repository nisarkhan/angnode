angular
  .module('sunloan', [
    'ngCookies',
    'ngRoute',
    'ngResource',
    'ngAnimate'
  ])
  .value('$path', {
      rest : "/sunloans",
      template: "../common/templates/"
  })
  .config(function($httpProvider){

      /* http interceptors */
      $httpProvider.defaults.timeout = 1000;
      $httpProvider.interceptors.push(function($q, $rootScope) {
        return {
           requestError: function() {
              console.log("@request: error", arguments);
           },
           responseError: function( response ) {

              var notification = { type: 'danger',
                                   title:  response.status+ ' - ' +response.statusText,
                                   message: 'Unable to get response from: '+response.config.url };

              if( 'data' in response ){
                notification.details = [];
                if( typeof response.data != 'object'){
                  response.data = [response.data];
                }
                angular.forEach(angular.copy(response.data), function(error){
                  if(error.message != null){
                    notification.details.push(error.message);
                  }
                });
              }
              if( response.message != null ){
                message += " <b>"+response.message+"</b>"
              }
              console.log(response);
              $rootScope.$notifications.push(notification);
              return $q.reject(response);
           }
        }
      });

  })
  .factory('$response', function(){
    return {
      to_resource: function(json, resource){
          try{
            var collection = angular.fromJson(json);
            angular.forEach(collection.items, function(item, id) {
                collection.items[id] = new resource(item);
            });
            return collection;
          }catch(e){

          }
      }
    }
  })
  .run(function($rootScope,
                $routeParams,
                $location,
                $user){

    /* Grid objects */
    $rootScope.grids = {};
    /* User data */
    $rootScope.user = {};

    $rootScope.$notifications = [];
    $rootScope.$notifications.$remove = function( index){
      $rootScope.$notifications.splice(index, 1);
    }

    /* Redirect to search controller */
    $rootScope.search = function( query){
      $location.path("/search/"+query);
    };

    /* Logout action */
    $rootScope.logout = function(){
      $user.logout(function(response){
        $location.path("/");
      });
      window.location = '/sunloans/html/';
    };

    $rootScope.$on('$locationChangeSuccess', function(){
      $("html, body").animate({ scrollTop: 0 });
    });

    $rootScope.alert = function(message, title){
      var dialog = angular.element('#modal-global-info');
      $rootScope.alertDialog = {message : message, title : title || false };
      dialog.modal('show');
    }
    /* Get user data */
    $user.get(function( response){

      $rootScope.user = response;
      console.log("@user:", response);

    });

  })
