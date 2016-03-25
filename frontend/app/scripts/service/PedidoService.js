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
      getPedido: function (idPedido,successCallback, errorCallback) {
        request.get('pedido/'+idPedido+'/getPedido', successCallback, errorCallback);

      },
      salvarFoto: function (data, successCallback, errorCallback) {

        request.postFormEncoded('pedido/adicionarFoto', data, successCallback, errorCallback);

      },
      filtrarMapa: function (data, successCallback, errorCallback) {

        request.postFormEncoded('mapa/filtrarPedidosMapa', data, successCallback, errorCallback);

      },
      commentar: function (data, successCallback, errorCallback) {

        request.postFormEncoded('pedido/commentar', data, successCallback, errorCallback);

      },
      listarComentario : function (idPedido,successCallback, errorCallback) {

        request.get('pedido/'+idPedido+'/listarComentario', successCallback, errorCallback);

      },
      listarPedidosUsuario : function (data,successCallback, errorCallback) {

        request.postFormEncoded('pedido/listarPedidosByUser',data, successCallback, errorCallback);

      },
      listarPedidosPaginada : function (pagina,successCallback, errorCallback) {

        request.get('pedido/'+pagina+'/listarPedidosPagina', successCallback, errorCallback);
      },
      aprovarPedido : function (data,successCallback, errorCallback) {

        request.postFormEncoded('pedido/aprovarPedido',data, successCallback, errorCallback);
      },
      reprovarPedido : function (data,successCallback, errorCallback) {

        request.postFormEncoded('pedido/reprovarPedido', data,successCallback, errorCallback);
      }

  };//fim return

  });//fim service

})();
