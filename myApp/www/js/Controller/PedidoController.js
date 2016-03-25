app.controller('PedidoCtrl', function($scope,$state,Mensagem,localStorageService,PedidoService) {



  console.log($scope.layers)

  // Called to navigate to the main app
  $scope.map = {
    center : {}
  };

  $scope.altura =  $(window).height()  + 'px';
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
    }
  });

  if($state.$current.self.name == "tabs.pedidomapa" || $state.$current.self.name == "tabs.detalhePedMapa"){
    if(localStorageService.get("pedido").id==null){
      $state.go('tabs.home');
    }
    else{
      PedidoService.getPedido(localStorageService.get("pedido").id,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.pedido =  data.data;
            inicializarMapa(data.data.lat,data.data.lng);
            $scope.center = {
              lat: data.data.lat,
              lng: data.data.lng,
              zoom :15
            };
          }
        }

      });
    }
  }

  $scope.comentar = function(comment){
    if($state.$current.self.name == "tabs.comentarios" || $state.$current.self.name == "tabs.comentario_map"){
      if(localStorageService.get("pedido").id==null){
        $state.go('tabs.home');
      }
      else{
        PedidoService.comentar({comentario : comment,idPedido : localStorageService.get("pedido").id},function (data) {
          if (data.status == 'e') {
            Mensagem.exibir('Error',data.message);
          } else {
              Mensagem.exibir('Sucesso!',data.message);

          }

        });
      }
    }
  };


  if($state.$current.self.name == "tabs.comentarios" || $state.$current.self.name == "tabs.comentario_map"){
    if(localStorageService.get("pedido").id==null){
      $state.go('tabs.home');
    }
    else{
      PedidoService.listarComentarios(localStorageService.get("pedido").id,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
            $scope.comentarios =  data.data;
          }
        }

      });
    }
  }

  $scope.map.center = {
    latitude: -19.8008348,
    longitude:  -43.9431333,

  };
  $scope.ponto = {
    "id":2,
    latitude: -19.8008348,
    longitude:  -43.9431333,
    "options":
    {"animation":1,
      "labelContent":"Markers id 1",
      "labelAnchor":"22 0",
      "labelClass":"marker-labels"
    }
  };
  $scope.localizacaoAtual = {
    "id":1,
    "showWindow":true,
    "options":
    {"animation":1,
      icon:'img/pointatual.png',
      "labelContent":"Markers id 1",
      "labelAnchor":"22 0",
      "labelClass":"marker-labels"
  }};
  $scope.options = {scrollwheel: false};


  $scope.mapaPedido = function() {
    $state.go('tabs.pedidomapa');
  };

  $scope.comentarios = function() {
    $state.go('tabs.comentarios');
  };


  $scope.addPedido = function(){

    Mensagem.exibir("Cadastro", "Dado Cadastrado com Sucesso ");
    $scope.pedidoCadastro.hide();
  };

  var onSuccess = function(position) {

    $scope.localizacaoAtual.latitude =  position.coords.latitude;
    $scope.localizacaoAtual.longitude =  position.coords.longitude;
    $scope.$apply();
  }
  function onError(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  //var posOptions = {timeout: 10000, enableHighAccuracy: false};
  //$cordovaGeolocation
  //  .getCurrentPosition(posOptions)
  //  .then(function (position) {
  //    var lat  = position.coords.latitude
  //    var long = position.coords.longitude
  //  }, function(err) {
  //    // error
  //  });


  function inicializarMapa(lat,lng){
    angular.extend($scope, {
      markers: {
        m1: {
          lat: lat,
          lng: lng,
          focus: false,
          draggable: false,
          message: "Animal Aqui <div></div>",
          icon: {
            iconUrl: 'img/ponto_marca.png',
            iconRetinaUrl: 'img/ponto_marca.png',
            iconSize: [32, 32],
            iconAnchor: [12.5, 41]
          }
        }
      }

    });
  }

  angular.extend($scope, {
    center :{},
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
