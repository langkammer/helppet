'use strict';

/**
 * @ngdoc service
 * @name
 * @description
 * # pipe
 * Service in the carpaApp.
 */
angular.module('myApp')
  .service('pipeService', function () {

      var dados = {};

      return {

          escrever: function(propriedade, valor) {

              dados[propriedade] = valor;
          },

          ler: function(propriedade) {

            var value = dados[propriedade];

            dados[propriedade] = {};

              return value;
          },

          limpar: function() {

              dados = {};
          }
      };
  });
