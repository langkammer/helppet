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
      listar: function (successCallback, errorCallback) {

        request.get('pedido/listarPedidos', successCallback, errorCallback);

      },
      listarCidades: function (uf,successCallback, errorCallback) {

        request.get('generico/'+uf+'/listaCidades', successCallback, errorCallback);

      }

    };//fim return

  });//fim service

})();
