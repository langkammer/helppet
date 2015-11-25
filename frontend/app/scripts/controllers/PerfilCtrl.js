'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PerfilCtrl', function ($scope,$location,Mensagem,SessaoArmazenacao,UsuarioService) {


    if(SessaoArmazenacao.getSessao()){
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();
      $scope.user = SessaoArmazenacao.getSessao();
    }

    $scope.adicionarPedido = function () {

      $location.path("/novo-pedido");
    };

    $scope.atualizar = function () {

      UsuarioService.salvarUsuario({usuario : $scope.user},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {

          Mensagem.exibir(data.message, 'success')
          //atualizando sessao
          SessaoArmazenacao.setSessao(data.data);


        }
      });

    };


  });
