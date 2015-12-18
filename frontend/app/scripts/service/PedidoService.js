/**
 * Created by Robson on 17/11/2015.
 */
;(function() {

  'use strict';

  /**
   * @ngdoc function
   * @name gmrsModule.service:AcaoService
   * @description
   * # AcaoService
   * Service que faz o controlle de areas inicialmente utilizado na tela de residuos solidos
   */
  angular.module('frontendApp').service('PedidoService', function (request) {

    return {

      salvarPedido: function (data, successCallback, errorCallback) {

          request.postFormEncoded('pedido/cadastrarPedido', data, successCallback, errorCallback);

        },

      buscarGps: function (data, successCallback, errorCallback) {

        request.postFormEncoded('pedido/buscarPedidoPorGps', data, successCallback, errorCallback);

      },
      listar: function (data,successCallback, errorCallback) {

        request.postFormEncoded('pedido/filtrarPedidos',data, successCallback, errorCallback);

      },
      listarCidades: function (uf,successCallback, errorCallback) {

        request.get('generico/'+uf+'/listaCidades', successCallback, errorCallback);

      },
      salvarFoto: function (data, successCallback, errorCallback) {

        request.postFormEncoded('pedido/adicionarFoto', data, successCallback, errorCallback);

      },

    };//fim return

  });//fim service

})();
