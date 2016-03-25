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
  angular.module('myApp').service('UsuarioService', function (request) {

    return {

      salvarUsuario: function (data, successCallback, errorCallback) {

        request.postFormEncoded('usuario/cadastro', data, successCallback, errorCallback);

      },

      recuperar: function (data, successCallback, errorCallback) {

        request.postFormEncoded('usuario/recuperar', data, successCallback, errorCallback);

      },
      verificarRedeSocial: function (idRedeSocial, successCallback, errorCallback) {

        request.get('usuario/'+idRedeSocial+'/verificar ',  successCallback, errorCallback);

      },
      logar: function (data, successCallback, errorCallback) {

        request.postFormEncoded('usuario/logar', data, successCallback, errorCallback);

      }
      ,
      deslogar: function (successCallback, errorCallback) {

        request.get('usuario/deslogar', successCallback, errorCallback);

      }
      ,
      enviarMsg: function (data,successCallback, errorCallback) {

        request.postFormEncoded('generico/enviaContatoMail',data, successCallback, errorCallback);

      },
      listarUsuariosPaginado: function (pagina, successCallback, errorCallback) {

        request.get('usuario/'+pagina+'/listar ',  successCallback, errorCallback);

      },
      listarMensagens: function (pagina, successCallback, errorCallback) {

        request.get('generico/'+pagina+'/listarMensagens ',  successCallback, errorCallback);

      }
    };//fim return

  });//fim service

})();
