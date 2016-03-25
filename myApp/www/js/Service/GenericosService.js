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
  angular.module('myApp').service('PedidoService', function (request,$http) {

    return {

      listarPedido: function (pagina,successCallback, errorCallback) {
        request.get('pedido/'+pagina+'/listarPedidosPagina', successCallback, errorCallback);

      },
      getPedido: function (idPedido,successCallback, errorCallback) {
        request.get('pedido/'+idPedido+'/getPedido', successCallback, errorCallback);

      },
      listarComentarios: function (idPedido,successCallback, errorCallback) {
        request.get('pedido/'+idPedido+'/listarComentario', successCallback, errorCallback);

      },
      comentar: function (data,successCallback, errorCallback) {
        request.postFormEncoded('pedido/commentar',data, successCallback, errorCallback);

      }

  };//fim return

  });//fim service

})();
