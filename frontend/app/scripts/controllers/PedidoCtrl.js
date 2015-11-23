'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PedidoCtrl', function ($scope,$location,PedidoService,Mensagem,Upload,SessaoArmazenacao) {

      console.log("main");

    $scope.usuario  = SessaoArmazenacao.getSessao();

    //if(SessaoArmazenacao.getSessao()){
    //  $location.path('/#');
    //}


    $scope.raio = 25;
    console.log($scope.anexo);
    $scope.altura =  $(window).height()  + 'px';
    $scope.center = {};

    $scope.$on("leafletDirectiveMap.click", function(event, args) {
      $scope.coordenada = {
        lat : args.leafletEvent.latlng.lat,
        lng : args.leafletEvent.latlng.lng
      }
    });

    function montaObjeto(){
      var objetoDevolvido = {};
      //
      objetoDevolvido.usuario = {
        id : SessaoArmazenacao.getSessao()
      };
      objetoDevolvido.tipoAnimal = $scope.pedido.tipoAnimal;
      objetoDevolvido.geo = $scope.coordenada;
      objetoDevolvido.observacao = $scope.pedido.observacao;
      objetoDevolvido.condicoes = $scope.pedido.condicoes;
      if($scope.pedido.frequencia == 1)
        objetoDevolvido.frequencia = 'UMA';
      if($scope.pedido.frequencia == 2)
        objetoDevolvido.frequencia = 'DUAS';
      if($scope.pedido.frequencia == 3)
        objetoDevolvido.frequencia = 'TRES';
      objetoDevolvido.data = new Date().parseData();
      objetoDevolvido.municipio = $scope.pedido.municipio;

      return objetoDevolvido;
    };
    $scope.salvarPedido = function(e){
    //Do what you need to do
      var objetoMontado = montaObjeto();
      if(e.files.length>5){
        Mensagem.exibir("Impossivel Publicar Fotos supera o limite de 5 fotos");
        return;
      }
      else{
        PedidoService.salvarPedido({pedido : objetoMontado},function (data) {
          if (data.status == 'e') {
            Mensagem.exibir(data.message, 'error')
          } else {


          }
        });
      }

    };
    //$scope.map = {
    //  defaults: {
    //    tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    //    maxZoom: 18,
    //    zoomControlPosition: 'bottomleft'
    //  }
    //};
    angular.extend($scope, {
      center: {
        lat: -19.922681,
        lng: -43.944540,
        zoom: 4
      }
    });
    $scope.$parent.menu = $location.path();

    $scope.adicionarPedido = function () {

      $location.path("/novo-pedido");
    };

    $scope.uf = app.dadosGenericos.dadosGenericos().estados;

    setTimeout(function(){
      $("#estados").chosen();
      $("#cidades").chosen();

    },5);

    $scope.listaCidades = function (uf) {
      PedidoService.listarCidades(uf,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {
          setTimeout(function(){
            $('#cidades').trigger('chosen:updated');


          },5);
          $scope.cidades = data.data;



        }
      });
    };

  });
