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

    var prefix = "http://192.168.0.103:9000/service/";

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
      listarCidades: function (uf,successCallback, errorCallback) {

        request.get('generico/'+uf+'/listaCidades', successCallback, errorCallback);

      },
      comentar: function (data,successCallback, errorCallback) {
        request.postFormEncoded('pedido/commentar',data, successCallback, errorCallback);

      },
      salvarPedido: function (data, successCallback, errorCallback) {

        request.postFormEncoded('pedido/cadastrarPedido', data, successCallback, errorCallback);

      },
      listarPedidosUsuario : function (data,successCallback, errorCallback) {

        request.postFormEncoded('pedido/listarPedidosByUser',data, successCallback, errorCallback);

      },
      filtrarMapa: function (data, successCallback, errorCallback) {

        request.postFormEncoded('mapa/filtrarPedidosMapa', data, successCallback, errorCallback);

      },
      filtrarMapaFiltro: function (data, successCallback, errorCallback) {
        request.postFormEncoded('mapa/filtrarPedidosMapaApp', data, successCallback, errorCallback);

      },
      cadastrar: function(pedido) {

        var formData = new FormData(),
          i;

          formData.append('pedido[idPedido]', pedido.idPedido);
          formData.append('pedido[padrao]', pedido.padrao);

        for(i = 0; i < pedido.files.length; i++) {

          formData.append('pedido[foto][' + i + ']', pedido.files[i], 'foto' + i + '.jpeg');
        }
        request = {

          method: 'POST',
          url: prefix + 'pedido/adicionarFoto2',
          data: formData,
          headers: {

            'Content-Type': undefined,
            'authorization': 'ok',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }/*,
           transformRequest: angular.identity*/
        };

        return $http(request);
      }

  };//fim return

  });//fim service

})();
