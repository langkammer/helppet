'use strict';

/**
 * @ngdoc service
 * @name desktopApp.Mensagem
 * @description
 * # Mensagem
 * Factory in the desktopApp.
 */
angular.module('frontendApp')
  .factory('Mensagem', function () {

    function config(texto, tipo){
      return {
        text: texto,
        type: tipo || 'error',
        theme: 'bootstrapTheme',
        closeWith: ['button', 'click'],
        killer: true,
        timeout : 3000,
        maxVisible: 1
      };
    }

    return {
      exibir: function (texto,tipo,element) {

        if(element) {

          $('#'+element).noty(config(texto, tipo));

        } else {


          noty(config(texto, tipo));

        }
      },

      esconder: function() {

        $.noty.closeAll();
      }
    };
  });
