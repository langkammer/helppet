'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdministracaoCtrl', function ($scope,$location,PedidoService,Mensagem,SessaoArmazenacao,UsuarioService) {

    if(SessaoArmazenacao.getSessao()){
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();
    }
    else{
      $scope.$parent.usuario = null;
    }
    $scope.$parent.menu = $location.path();
    if(SessaoArmazenacao.getSessao().tipo != 'ADMINISTRACAO'){
      $location.path("/#/");
    }
    $scope.abrePedido = function(p){
      SessaoArmazenacao.setPedidos(p);
      $location.path("/detalhes-pedido");
    };

    $scope.abreModalConfirmPedidos = function(p){
      $scope.p = p;
      $('#ModalAvaliacaoPedido').modal('show');

    };

    $scope.abreMsgView = function(m){
      $('#ModalMsgContato').modal('show');
      $scope.m = m;

    };

    $scope.usuario = SessaoArmazenacao.getSessao();

    function init(){
      $scope.listarPedidos();
      $scope.listarUsuarios();
      $scope.listarMsg();
    };

    $scope.comentar = function () {

    };
    $scope.reprovar = function (p) {
      PedidoService.reprovarPedido({pedido : p},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data){
            Mensagem.exibir(data.message, 'success');
            $('#ModalAvaliacaoPedido').modal('hide');
            $scope.listarPedidos();

          }
        }

      });
    };
    $scope.aprovar = function (p) {
      PedidoService.aprovarPedido({pedido : p},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data){
            Mensagem.exibir(data.message, 'success');
            $('#ModalAvaliacaoPedido').modal('hide');
            $scope.listarPedidos();

          }
        }

      });
    };

    $scope.listarPedidos = function(){
      $scope.pedidos = [];
      var pagina = 1
      if($scope.paginaCorrentePedidos)
         pagina = $scope.paginaCorrentePedidos;
      PedidoService.listarPedidosPaginada(pagina,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.pedidos = data.data;
            $scope.totalItemsPedidos = data.length;

            }
          }

      });
    };

    $scope.listarUsuarios = function(){
      $scope.usuarios = [];
      var pagina = 1
      if($scope.paginaCorrenteUsuarios)
        pagina = $scope.paginaCorrenteUsuarios;
      UsuarioService.listarUsuariosPaginado(pagina,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.usuarios = data.data;
            $scope.totalItemsUsuarios = data.length;

          }
        }

      });
    };

    $scope.listarMsg = function(){
      $scope.mensagens = [];
      var pagina = 1
      if($scope.paginaCorrenteMensagens)
        pagina = $scope.paginaCorrenteMensagens;
      UsuarioService.listarMensagens(pagina,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.mensagens = data.data;
            $scope.totalItemsMensagens = data.length;

          }
        }

      });
    };

    init();

  });
