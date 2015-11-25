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
    $scope.markers = [];

    if(SessaoArmazenacao.getSessao())
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();


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
        ,

      //  markers:[
      //  {
      //    id: 1,
      //    endereco: 'Rua José Luiz de Deus 42',
      //    lat: -19.810282,
      //    lng: -43.965337,
      //    icon: {
      //      iconUrl: 'img/ponto_marca.png',
      //      iconRetinaUrl: 'img/ponto_marca.png',
      //      iconSize: [32, 32],
      //      iconAnchor: [12.5, 41]
      //    },
      //    message: "Animal Aqui <div>  <img src='images/cao-vira-lata.jpg' height='100%' width='100%'></div>",
      //  }
      //]
      $scope.markers = [];
      $scope.markers.push($scope.coordenada);
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
      objetoDevolvido.usuario = SessaoArmazenacao.getSessao();
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


      PedidoService.salvarPedido({pedido : objetoMontado, lat : objetoMontado.geo.lat, lng: objetoMontado.geo.lng},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {
          Mensagem.exibir(data.message,"success");
          $location.path("/upload-pedido");
        }
      });


        //PedidoService.salvarPedido({pedido : objetoMontado},function (data) {
        //  if (data.status == 'e') {
        //    Mensagem.exibir(data.message, 'error')
        //  } else {
		//
		//
        //  }
        //});


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
      },
      layers: {
        baselayers: {
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
    $scope.salvarFotos= function(e){
      if(e.files.length>5){
        Mensagem.exibir("Impossivel Publicar Fotos supera o limite de 5 fotos");
        return;
      }
      if(e.files.length<1){
        Mensagem.exibir("Impossivel Publicar sem Nenhuma foto");
        return;
      }
    };

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
