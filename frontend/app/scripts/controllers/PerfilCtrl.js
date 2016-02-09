'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PerfilCtrl', function ($scope,$location,Mensagem,SessaoArmazenacao,UsuarioService,PedidoService) {


    if(SessaoArmazenacao.getSessao()){
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();
      $scope.user = SessaoArmazenacao.getSessao();
    }

    $scope.adicionarPedido = function () {

      $location.path("/novo-pedido");
    };

    $scope.abrePedido = function(p){
      SessaoArmazenacao.setPedidos(p);
      $location.path("/detalhes-pedido");
    };

    //$scope.abreNotificacao = function(p){
	//
    //  $scope.p = p;
    //  $('#ModalRemoverPublicação').modal('show')
	//
    //};

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

    init();

    function init(){
      PedidoService.listarPedidosUsuario(function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {

          $scope.pedidosUsuario = data.data;

        }
      });

    }

    $scope.$on("leafletDirectiveMap.moveend", function(event, args) {
      //
      ////console.log("zoom",$scope.center);
      PedidoService.filtrarMapa({lat : $scope.center.lat,lng: $scope.center.lng,raio :$scope.center.zoom},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {
          $scope.mapsPontos = [];
          if(data.data)
            $scope.mapsPontos = data.data;
        }
      });

    });

    angular.extend($scope, {
      center: {
        lat: -19.922681,
        lng: -43.944540,
        zoom: 16,
        autoDiscover: true
      },
      layers: {
        baselayers: {
          Google: {
            name: 'Google Mapas',
            type: 'xyz',
            url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            layerOptions: {
              maxZoom: 20,
              subdomains: ['mt0','mt1','mt2','mt3'],
              attribution: '&copy; <a href="http://www.google.com/copyright">Google</a> contributors',
              continuousWorld: true
            }
          },
          osm: {
            name: 'Open Street Map',
            type: 'xyz',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            layerOptions: {
              subdomains: ['a', 'b', 'c'],
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              continuousWorld: true
            }
          },
          Hybrid: {
            name: 'Google Hybrid',
            type: 'xyz',
            url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
            layerOptions: {
              maxZoom: 20,
              subdomains: ['mt0','mt1','mt2','mt3'],
              attribution: '&copy; <a href="http://www.google.com/copyright">Google</a> contributors',
              continuousWorld: true
            }
          },
          Satellite: {
            name: 'Google Satellite',
            type: 'xyz',
            url: 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            layerOptions: {
              maxZoom: 20,
              subdomains: ['mt0','mt1','mt2','mt3'],
              attribution: '&copy; <a href="http://www.google.com/copyright">Google</a> contributors',
              continuousWorld: true
            }
          }

        }

      }

    });

  });
