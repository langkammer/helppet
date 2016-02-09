'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('DetalhesPedidoCtrl', function ($scope,$location,PedidoService,Mensagem,SessaoArmazenacao) {
    $scope.center = {};

    $scope.usuario = SessaoArmazenacao.getSessao();

    $scope.markers = [];


    angular.extend($scope, {
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
    function init(){
      if($location.search().id)
        SessaoArmazenacao.setPedidos({id :$location.search().id});

      PedidoService.getPedido(SessaoArmazenacao.getPedidos().id,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.p = data.data;
            $scope.center = {lat : data.data.lat, lng : data.data.lng, zoom : 16};
            if(data.data.lat){
              $scope.marker = [{lat : data.data.lat, lng : data.data.lng}];

            }
          }
        }
      });
    };

    $scope.comentar = function () {
      PedidoService.commentar({comentario : $scope.comentario,idPedido : SessaoArmazenacao.getPedidos().id},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          Mensagem.exibir(data.message, 'success');
          $scope.comentario = '';
          $scope.listarComentario();
        }
      });
    };

    $scope.listarComentario = function(){
      PedidoService.listarComentario(SessaoArmazenacao.getPedidos().id,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.comentarios = data.data;
          }
        }
      });
    };

    init();

  });
