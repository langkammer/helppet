'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PedidoCtrl', function ($scope,$location,PedidoService,Mensagem,Upload,SessaoArmazenacao,leafletData) {


      console.log("main");
    $scope.markers = [];

    $scope.files = [];

    $scope.raio = 100;

    $scope.tipoAnimal = "CAES";

    $scope.tipEndereco = "MAPA";


    if(SessaoArmazenacao.getPedidos())
      $scope.sessaoPedido = SessaoArmazenacao.getPedidos();

    if(SessaoArmazenacao.getSessao())
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();

    //$scope.addFoto = function(e){
    //  console.log("SS");
    //};

    $scope.array = function (num) {

      var array = [];
      if(num > 1){
        for(var i = 0; i <= num; i ++)
          array.push(i)
      }
      else{
          array.push(0)
      }

      return array;
    };




    $scope.listarPedidos = function () {
      PedidoService.listar({lat : null,codigoMunicipio : $scope.cidade,lng: null,tipoAnimal: $scope.tipoAnimal,raio: $scope.raio,ordem: true,pagina : 1},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {
          $scope.listaPedidos = [];
          if(data.data)
            $scope.listaPedidos = JSON.parse(data.data);
        }
      });

    };


    //if(SessaoArmazenacao.getSessao()){
    //  $location.path('/#');
    //}

    $scope.addFile =function(){
      if($scope.file!=null){


      if($scope.file.name.split(".")[1].toUpperCase() == 'JPG' || $scope.file.name.split(".")[1].toUpperCase() == 'JPEG'  || $scope.file.name.split(".")[1].toUpperCase() == 'PNG'  || $scope.file.name.split(".")[1].toUpperCase() == 'BMP' )
      {
        if($scope.file){
          if($scope.files.length <= 5){
            if(!_.findWhere($scope.files, {name : $scope.file.name}) )
              $scope.files.push($scope.file);
          }
          else{
            Mensagem.exibir("Limite de fotos excedeu");
          }

        }
      }
      else{
        Mensagem.exibir("Extenção não permetida",'error');
      }

    }
    };

    $scope.removeFile = function(item){

      if($scope.files)
        $scope.files = _.without($scope.files, item);

    };

    $scope.definirPadrao = function (file) {

        $scope.padrao = file.name;

    };

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
      if($scope.coordenada.lat==null || $scope.coordenada.lng == null){
        Mensagem.exibir("Por Favor Selecione um Lugar no mapa ou digite o endereço", "error");
        return;
      }
      else{
        var objetoMontado = montaObjeto();


        PedidoService.salvarPedido({pedido : objetoMontado, lat : objetoMontado.geo.lat, lng: objetoMontado.geo.lng},function (data) {
          if (data.status == 'e') {
            Mensagem.exibir(data.message, 'error')
          } else {
            if(SessaoArmazenacao.getPedidos())
              SessaoArmazenacao.limparPedidos();
            Mensagem.exibir(data.message,"success");
            SessaoArmazenacao.setPedidos(JSON.parse(data.data));
            $location.path("/upload-pedido");
          }
        });
      }





        //PedidoService.salvarPedido({pedido : objetoMontado},function (data) {
        //  if (data.status == 'e') {
        //    Mensagem.exibir(data.message, 'error')
        //  } else {
		//
		//
        //  }
        //});


    };
    $scope.finalizarPedido = function(e){
      if($scope.files.length>5){
        Mensagem.exibir("Impossivel Publicar Fotos supera o limite de 5 fotos");
        return;
      }
      if($scope.files.length<1){
        Mensagem.exibir("Impossivel Publicar sem Nenhuma foto");
        return;
      }

      if($scope.files.length <= 5){
        if(!$scope.padrao)
          $scope.padrao = $scope.files[0].name;
        //for(var i = 0; i <= $scope.files.length; i ++){
          Upload.upload({
            url: 'service/pedido/adicionarFoto',
            method: 'POST',
            data : {idPedido : SessaoArmazenacao.getPedidos().id, padrao : $scope.padrao},
            file:  $scope.files,
            fileFormDataName: "file"
          })
            .success(function(data){

              if (data.status == 'e') {
                Mensagem.exibir(data.message, 'error');
              }
              else {

                if(SessaoArmazenacao.getPedidos())
                  SessaoArmazenacao.limparPedidos();
                Mensagem.exibir(data.message,"success");
                $location.path("/pedido");


              }


            })
            .error(function(data){
              Mensagem.exibir("ERRO " + data.message,'error');

            });
        //}



          //PedidoService.salvarFoto({},function (data) {
          //  if (data.status == 'e') {
          //    Mensagem.exibir(data.message, 'error')
          //  } else {
          //    if(SessaoArmazenacao.getPedidos())
          //      SessaoArmazenacao.limparPedidos();
          //    Mensagem.exibir(data.message,"success");
          //    SessaoArmazenacao.setPedidos(data.data);
          //    $location.path("/upload-pedido");
          //  }
          //});



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
        autoDiscover: true
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

    $scope.selecionaCidadeMapa = function(){
      if($scope.pedido.municipio.lat){
        $scope.center = {
          lat: $scope.pedido.municipio.lat,
          lng: $scope.pedido.municipio.lng,
          zoom: 15
        };
        $scope.$apply();
      }
    };

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, function () {
        console.log("erro");
      });
    } else {
      Mensagem.exibir('Permita o envio de  sua Localizacao no seu navegador para o melhor uso do sistema','warning');
    }

    function successFunction(position) {
      $scope.lat =  position.coords.latitude;
      $scope.lng = position.coords.longitude;
      //console.log('Your latitude is :'+lat+' and longitude is '+long);
    }

    function init(){
      $scope.listarPedidos();
    }

    init();

  });
