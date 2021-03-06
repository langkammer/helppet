'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MapaCtrl', function ($scope,$location,SessaoArmazenacao,PedidoService,Mensagem) {

    $scope.abrirPedido = function (p) {
      SessaoArmazenacao.setPedidos(p);
      $location.path("/detalhes-pedido");
    };

    //$scope.mapsPontos = [
    //  {
    //    lat : -19.918565630724597,
    //    lng : -44.07744884490967
    //  },
    //  {
    //    lat : -19.912755404317988,
    //    lng : -44.075303077697754
    //  },
    //  {
    //    lat : -19.916669260850536,
    //    lng : -44.093263149261475
    //  }
    //];
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

    console.log("mapa");

    if(SessaoArmazenacao.getSessao())
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();

    $scope.$parent.menu = $location.path();

    $scope.menu = true;

    $scope.altura =  parseInt(parseInt($(window).height()))  + 'px';

    $scope.center = {};
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
