'use strict';

/**
 * @ngdoc service
 * @name desktopApp.Mensagem
 * @description
 * # Mensagem
 * Factory in the desktopApp.
 */
angular.module('myApp')
  .factory('Mensagem', function ($ionicPopup) {


    return {
      exibir: function (titulo,msg) {

        if(titulo) {
            var alertPopup = $ionicPopup.alert({
              title: titulo,
              template: msg
            });
            alertPopup.then(function(res) {
            });
          }


      }

    };

  });
