app.controller('MapaCtrl', function($scope,$cordovaGeolocation,$state,$ionicModal,pipeService,Mensagem) {


  $scope.altura =  $(window).height()  + 'px';

  $scope.listaMarcacao = [];

  var marcacao = {};

  $scope.markers = [];


  // Load the modal from the given template URL
  $ionicModal.fromTemplateUrl('pages/modal/modal_filtro_mapa.html', function($ionicModal) {
    $scope.filtroMapa = $ionicModal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });

  $scope.$on('leafletDirectiveMarker.click', function(e, args) {

    if(args.model.id){
      $state.go('tabs.detalhespedido');
      pipeService.escrever('idPedido', {id: args.model.id});

    }


    //limparMarcas();
    //$scope.entidades[args.modelName].icon = {
    //
    //  iconUrl: 'img/lampada-vermelha.png',
    //  iconRetinaUrl: 'img/lampada-vermelha.png',
    //  iconSize: [25, 41],
    //  iconAnchor: [12.5, 41]
    //
    //};
    //$scope.entidadeEscolhida = $scope.entidades[args.modelName];
    //var layer,
    //  ajuste = e.targetScope.center.zoom / 100000,
    //  latlng = {
    //
    //    lat: args.leafletEvent.latlng.lat + ajuste,
    //    lng: args.leafletEvent.latlng.lng
    //  };
    //
    //leafletData.getMap().then(function(map) {
    //
    //  mapa = map;
    //  popup = L.popup();
    //  popup
    //    .setLatLng(latlng)
    //    .setContent(criarConteudo(parseInt(args.modelName)))
    //    .openOn(mapa);
    //});
  });

  function abrirPedido(pedido) {
    alert(pedido);
    //$state.go('intro');

  }

  var posOptions = {

    timeout: 4000,
    enableHighAccuracy: true
  };

  $cordovaGeolocation

    .getCurrentPosition(posOptions)
    .then(function(position) {

      $scope.posicao.lat = position.coords.latitude;
      $scope.posicao.lng = position.coords.longitude;
      $scope.posicao.zoom = 15;
      marcacao = {
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        message: "Você Está Aqui",
        focus: true,
        draggable: false,
        markerZoomAnimation : true
      };
      $scope.markers.push(marcacao);

    },
    function(error) {

      if (error.code == 1 || error.code == 2 || error.code == 3) {

        Mensagem.exibir('Atenção','Não foi possíel capturar sua posição atual. Verifique se o GPS do seu dispositivo está ativado.');

      }
    });


  $scope.map = {
    defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 18,
      zoomControlPosition: 'bottomleft'
    }
  };
  angular.extend($scope, {
    posicao: {
    },
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          type: 'xyz',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          layerOptions: {
            subdomains: ['a', 'b', 'c'],
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            continuousWorld: true
          }
        },
        cycle: {
          name: 'OpenCycleMap',
          type: 'xyz',
          url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
          layerOptions: {
            subdomains: ['a', 'b', 'c'],
            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            continuousWorld: true
          }
        }
      },
      overlays: {
        hillshade: {
          name: 'Hillshade Europa',
          type: 'wms',
          url: 'http://129.206.228.72/cached/hillshade',
          visible: true,
          layerOptions: {
            layers: 'europe_wms:hs_srtm_europa',
            format: 'image/png',
            opacity: 0.25,
            attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
            crs: L.CRS.EPSG900913
          }
        },
        animal: {
          name: 'Cars',
          type: 'markercluster',
          visible: true
        }
      }
    },
    markers: [
      {
        id: 1,
        endereco: 'Rua José Luiz de Deus 42',
        lat: -19.810282,
        lng: -43.965337,
        layer: 'animal',
        icon: {
          iconUrl: 'img/ponto_marca.png',
          iconRetinaUrl: 'img/ponto_marca.png',
          iconSize: [32, 32],
          iconAnchor: [12.5, 41]
        },
        message: "Animal Aqui <div>  <img src='img/cao-vira-lata.jpg' height='100%' width='100%'></div>",
      },
      {
        id: 2,
        endereco: 'Rua José Luiz de Deus 42',
        lat: -19.810335,
        lng: -43.949760,
        layer: 'animal',
        icon: {
          iconUrl: 'img/ponto_marca.png',
          iconRetinaUrl: 'img/ponto_marca.png',
          iconSize: [32, 32],
          iconAnchor: [12.5, 41]
        },
        message: "Animal Aqui <div>  <img src='img/cao-vira-lata.jpg' height='100%' width='100%'></div>",
      },
      {
        id: 3,
        endereco: 'Rua José Luiz de Deus 42',
        lat: -19.807166,
        lng: -43.953139,
        layer: 'animal',
        icon: {
          iconUrl: 'img/ponto_marca.png',
          iconRetinaUrl: 'img/ponto_marca.png',
          iconSize: [32, 32],
          iconAnchor: [12.5, 41]
        },
        message: "Animal Aqui <div>  <img src='img/cao-vira-lata.jpg' height='100%' width='100%'></div>",
      }
    ]
  });








  function init(){
  }

  init;

});
