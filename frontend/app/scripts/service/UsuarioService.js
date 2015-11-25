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
  angular.module('frontendApp').service('UsuarioService', function (request) {

    return {

      salvarUsuario: function (data, successCallback, errorCallback) {

        request.postFormEncoded('usuario/cadastro', data, successCallback, errorCallback);

      },

      recuperar: function (data, successCallback, errorCallback) {

        request.get('usuario/recuperar', data, successCallback, errorCallback);

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
    };//fim return

  });//fim service

})();
