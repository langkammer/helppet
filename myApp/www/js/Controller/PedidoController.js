app.controller('PedidoCtrl', function($scope,$state,Mensagem) {

  // Called to navigate to the main app
  $scope.map = {
    center : {}
  };
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



});
