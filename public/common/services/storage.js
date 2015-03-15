'use strict';
/* Storage Service */
angular
  .module('sunloan')
  .factory('$storage', function($http){
    
    return {
      
      createCookie : function(name,value,days) {
        
          if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
          }
          else var expires = "";
          document.cookie = name+"="+value+expires+"; path=/";
      
      },
      
      readCookie : function(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
      },
      
      eraseCookie: function(name) {
        createCookie(name,"",-1);
      },
      
      put : function(name, value){
        
          if( typeof value == 'object' ) value = JSON.stringify(value);
          if( localStorage ) {
            localStorage.setItem(name, value);
          }else{
            this.createCookie(name, value);
          };
          return value;
        
      },
      
      remove : function(){
        
          angular.forEach( arguments, function(name){
            
            if( localStorage ){
              localStorage.removeItem(name);
            } else {
              this.eraseCookie(name);
            };

          });
        
      },
      
      get : function(name){
          var value = false;
          if( localStorage ){
            value = localStorage.getItem(name);
          }else{
            value = this.readCookie(name);
          }
          try{
            value = jQuery.parseJSON(value);
          }catch(e){}
          return value;
      },

      update : function(name, attrs){
        
        var data = angular.extend(this.get(name), attrs);
        return this.put(name, data);
      }
      
    }

  }); 