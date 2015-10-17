app.controller('PainelCtrl', function($scope, $cordovaGeolocation, $cordovaBarcodeScanner, $state, $ionicPopup, $ionicModal,
                                      $timeout, leafletData,$cordovaCamera,Mensagem,pipeService) {
  // Called to navigate to the main app

  $scope.pedido = {
    fotos : []
  };

  $scope.altura =  $(window).height()  + 'px';

  var mapa,
    popup = null;

  console.log(pipeService.ler('idPedido'));

  $scope.addPedido = function(){

    Mensagem.exibir("Cadastro", "Dado Cadastrado com Sucesso ");
    $scope.pedidoCadastro.hide();
  };

  $scope.removeFoto = function(item){
    $scope.pedido.fotos = _.without($scope.pedido.fotos, item);
  };

  $scope.tirarFoto = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.pedido.fotos.push("data:image/jpeg;base64," + imageData);
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };
  $scope.anexarFoto = function() {
    var options = {
      quality : 50,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 700,
      targetHeight: 600,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.pedido.fotos.push("data:image/jpeg;base64," + imageData);
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };


  // Load the modal from the given template URL
  $ionicModal.fromTemplateUrl('pages/modal/modal_filtro_mapa.html', function($ionicModal) {
    $scope.filtroMapa = $ionicModal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('pages/modal/modal_cadastro_pedido.html', function($ionicModal) {
    $scope.pedidoCadastro = $ionicModal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });

  $scope.signIn = function(user) {
    $state.go('intro');
  };

  $scope.mapaPedido = function() {
    $state.go('tabs.pedidomapa');
  };

  $scope.comentarios = function() {
    $state.go('tabs.comentarios');
  };
  /**
   * Once state loaded, get put map on scope.
   */

  $scope.map = {
    height: $(window).height() - 245 + 'px',
    center: {
      lat: -19.810282, //-11.848056,
      lng: -43.965337, //-55.649167,
      zoom: 15
    },
    defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 18,
      zoomControlPosition: 'bottomleft'
    }
    };




});
