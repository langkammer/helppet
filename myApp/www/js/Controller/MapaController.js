app.controller('MapaCtrl', function($scope,$cordovaGeolocation,$state,$ionicModal,pipeService,Mensagem,PedidoService,localStorageService) {


  $scope.altura =  $(window).height()  + 'px';

  $scope.listaMarcacao = [];

  var marcacao = {};

  $scope.abrirPedido = function(p){
    localStorageService.set("pedido",{id : p});
    $state.go('tabs.detalhePed');

  };




  $scope.markers = [];
  $scope.$on("leafletDirectiveMap.moveend", function(event, args) {
    //
    ////console.log("zoom",$scope.center);
    PedidoService.filtrarMapa({lat : $scope.posicao.lat,lng: $scope.posicao.lng,raio :$scope.posicao.zoom},function (data) {
      if (data.status == 'e') {
        Mensagem.exibir(data.message, 'error')
      } else {
        $scope.mapsPontos = [];
        if(data.data){
          $scope.markers = [];
          for(var i = 0; i < data.data.length; i++){

            var objt = data.data[i];


            objt.message = '<div class="row">'+
            '      <div class="col center">' +
            '        <img src="http://localhost:9000/service/pedido/'+objt.id+'/getFoto/0" width="100px" height="100px" class="img-circle" >'+
            '           <p></p> '+
            '  <button ng-controller="MapaCtrl" class="button button-assertive" ng-click="abrirPedido('+objt.id+')" > Detalhes </button>'+
            '      </div>'+
            '      <div class="col-md-7">' +
            '        <div>' +
            '          <p>Tipo Animal : ' + objt.tipo +' </p>' +
            '        </div>' +
            '        <div>' +
            '          <p>Condicoes : '+ objt.condicao + ' </p>' +
            '       </div>' +
            '        <div>' +
            '          <p>Observacoes : ' + objt.observacao + ' </p>' +
            '        </div>' +
            '        <div>' +
            '          <p>Frequencia de avistamento : '+ objt.frequencia +' Vezes</p>' +
            '        </div>' +
            '      </div>' +
            '    </div>';


            $scope.markers.push(objt);
          }

        }

      }
    });

  });

  $scope.filtrar = function(p){


    PedidoService.filtrarMapaFiltro(
      {
        lat : $scope.posicao.lat,
        lng: $scope.posicao.lng,
        raio :p.raio,
        cao : p.cao ? true : false,
        gato: p.gato ? true : false,
        outros: p.outros ? true : false
      },function (data) {
      if (data.status == 'e') {
        Mensagem.exibir(data.message, 'error')
      } else {
        $scope.mapsPontos = [];
        if(data.data){
          $scope.markers = [];

          for(var i = 0; i < data.data.length; i++){

            var objt = data.data[i];


            objt.message = '<div class="row">'+
              '      <div class="col center">' +
              '        <img src="http://localhost:9000/service/pedido/'+objt.id+'/getFoto/0" width="100px" height="100px" class="img-circle" >'+
              '           <p></p> '+
              '  <button ng-controller="MapaCtrl" class="button button-assertive" ng-click="abrirPedido('+objt.id+')" > Detalhes </button>'+
              '      </div>'+
              '      <div class="col-md-7">' +
              '        <div>' +
              '          <p>Tipo Animal : ' + objt.tipo +' </p>' +
              '        </div>' +
              '        <div>' +
              '          <p>Condicoes : '+ objt.condicao + ' </p>' +
              '       </div>' +
              '        <div>' +
              '          <p>Observacoes : ' + objt.observacao + ' </p>' +
              '        </div>' +
              '        <div>' +
              '          <p>Frequencia de avistamento : '+ objt.frequencia +' Vezes</p>' +
              '        </div>' +
              '      </div>' +
              '    </div>';


            $scope.markers.push(objt);

            $scope.posicao.zoom = 14;

            $scope.filtroMapa.hide();
          }

        }

      }
    });
  }

  // Load the modal from the given template URL
  $ionicModal.fromTemplateUrl('pages/modal/modal_filtro_mapa.html', function($ionicModal) {
    $scope.filtroMapa = $ionicModal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });


  function abrirPedido(pedido) {
    alert(pedido);
    //$state.go('intro');

  }

  function iniMap(){
    navigator.geolocation.getCurrentPosition(
      function(dado)
      {
        console.log(dado);
      }
      ,
      function(err){
        console.log(err);
      }
      ,
      {
        timeout: 10000, enableHighAccuracy: true
      }
    );

  }

  $cordovaGeolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: false})
    .then(
    function (position) { //success Low-Accuracy
      console.log('getCurrentPosition: HighAccuracy false: Ok!');
      //[..]
      var lat  = position.coords.latitude
      var long = position.coords.longitude
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
    function(err) { //error Low-Accuracy
      console.log(err);
      $cordovaGeolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: false})
        .then(
        function (position) { //success High-Accuracy
          console.log('getCurrentPosition: HighAccuracy true: Ok!');
          //[..]
        },
        function(err) { //error High-Accuracy
          console.log('getLocation: ERRO: ' + err.code + ' => ' + err.message);
          Mensagem.exibir('Atenção','Não foi possíel capturar sua posição atual. Verifique se o GPS do seu dispositivo está ativado.');

          //[..]
        }
      );
    }
  );

  $scope.map = {
    defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 18,
      zoomControlPosition: 'bottomleft'
    }
  };
  angular.extend($scope, {
    posicao: {
      autoDiscover: true,
      zoom: 16
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
        CAES: {
          name: 'Cães',
          type: 'markercluster',
          visible: true
        },
        GATOS: {
          name: 'Gatos',
          type: 'markercluster',
          visible: true
        },
        OUTROS: {
          name: 'Outros',
          type: 'markercluster',
          visible: true
        }
      }
    }
  });








  function init(){
    iniMap();
  }

  init;

});
