app.controller('PainelCtrl', function($scope,UsuarioService, $cordovaGeolocation, $cordovaBarcodeScanner, $state, $ionicPopup, $ionicModal,
                                      $timeout, leafletData,$cordovaCamera,Mensagem,localStorageService,PedidoService,Foto) {
  // Called to navigate to the main app

  $scope.items = [];
  $scope.tamanhoAtual = 0;
  $scope.pedidos = [];

  $scope.fotos = [];

  $scope.pedido = {};

  $scope.uf = app.dados.dadosGenericos().estados;

  //$state.go('tabs.home');



  $scope.selecionaCidade = function(m){
    $scope.municipio = m;
  };

  function montaObjetoPedido(){

    var objetoRetorno =
    {
      tipoAnimal : $scope.pedido.tipoAnimal,
      condicoes : $scope.pedido.condicoes,
      municipio : $scope.municipio,
      observacao : $scope.pedido.observacao,
      usuario :  localStorageService.get("usuario"),
      frequencia : $scope.pedido.frequencia

    };
    return objetoRetorno;

  }

  function limparPedidos(){
    $scope.municipio = {};
    $scope.estado = {};
    $scope.pedido = {};

  }

  $scope.finalizarPedido = function(e){
    if($scope.fotos.length>5){
      Mensagem.exibir("Aviso","Impossivel Publicar Fotos supera o limite de 5 fotos");
      return;
    }
    if($scope.fotos.length<1){
      Mensagem.exibir("Aviso","Impossivel Publicar sem Nenhuma foto");
      return;
    }

    if($scope.fotos.length <= 5){

      PedidoService.cadastrar(
        {
          idPedido : localStorageService.get("pedidoNovo").id,
          padrao : null,
          files : getFiles($scope.fotos)

        }
        ,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {
          if(data.data){
            limparPedidos();
            $scope.fotoPedidos.hide();
            Mensagem.exibir("Cadastro", "Foto Salva com Sucesso");
          }


        }
      });

	  //
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

  $scope.salvarPedido = function(){
    //Do what you need to do

      PedidoService.salvarPedido({pedido : montaObjetoPedido(), lat : $scope.lat, lng: $scope.lng},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {
          if(data.data)
            localStorageService.set("pedidoNovo",JSON.parse(data.data));
          $scope.pedidoCadastro.hide();
          $scope.fotoPedidos.show();
          Mensagem.exibir("Cadastro", "Você deve inserir pelo menos uma foto do animal");


        }
      });


  };

  $scope.listaCidades = function (uf) {
    PedidoService.listarCidades(uf,function (data) {
      if (data.status == 'e') {
        Mensagem.exibir('error',data.message)
      } else {
        $scope.cidades = data.data;
      }
    });
  };

  if($state.$current.self.name == "tabs.detalhespedido" || $state.$current.self.name == "tabs.detalhePed"){
    if(localStorageService.get("pedido").id==null){
      $state.go('tabs.home');
    }
    else{
      PedidoService.getPedido(localStorageService.get("pedido").id,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {
          if(data.data){
           $scope.pedidoDetalhado =  data.data;
          }
        }

      });
    }
  }


  var pagina = 1;
  $scope.carregarMais = function() {
    PedidoService.listarPedido(pagina,function (data) {
      if (data.status == 'e') {
        Mensagem.exibir(data.message, 'error');
      } else {
        if(data.data){
          if(pagina>1){
            for(var i = 0; i < data.data.length; i++){
              $scope.pedidos.push(data.data[i]);
            }
          }
          else{
            $scope.pedidos = data.data;
          }
          $scope.tamanhoTotal = data.length;
          $scope.tamanhoAtual += data.data.length;
          $scope.$broadcast('scroll.infiniteScrollComplete');
          pagina++;
        }
      }

    });
  };

  $scope.abrirPedido = function(item){
    $state.go('tabs.detalhespedido');
    if(localStorageService.isSupported) {
      localStorageService.set("pedido",item);
    }

  };



  $scope.altura =  $(window).height()  + 'px';

  var mapa,
    popup = null;


  $scope.addPedido = function(){

    Mensagem.exibir("Cadastro", "Dado Cadastrado com Sucesso ");
    $scope.pedidoCadastro.hide();
  };

  function inicializaGeo(){
    $cordovaGeolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: false})
      .then(
      function (position) { //success Low-Accuracy
        console.log('getCurrentPosition: HighAccuracy false: Ok!');
        //[..]
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.pedidoCadastro.show();

        console.log($scope.lat,$scope.lng);
      },
      function(err) { //error Low-Accuracy
        console.log(err);
        $cordovaGeolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: false})
          .then(
          function (position) { //success High-Accuracy
            console.log('getCurrentPosition: HighAccuracy true: Ok!');
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.pedidoCadastro.show();

            console.log($scope.lat,$scope.lng);
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
  }

  $scope.abreModalPedido = function(){
    inicializaGeo();
  };

  $scope.removeFoto = function(item){
    $scope.fotos = _.without($scope.fotos, item);
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
      var imagem = new Image();
      imagem.src = "data:image/jpeg;base64," + imageData;
      imagem.onload = function() {
        $scope.fotos.push(new Foto(imagem));
        $scope.$apply();
      }

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
      var imagem = new Image();
      imagem.src = "data:image/jpeg;base64," + imageData;
      imagem.onload = function() {
      $scope.fotos.push(new Foto(imagem));
      $scope.$apply();
      };
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

  $ionicModal.fromTemplateUrl('pages/modal/modal_fotos.html', function($ionicModal) {
    $scope.fotoPedidos = $ionicModal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-right'
  });

  $scope.signIn = function(user) {
    UsuarioService.logar({login : user.username, senha: CryptoJS.SHA1(user.password).toString()},function (data) {
      if (data.status == 'e') {
        Mensagem.exibir('error',data.message);
      } else {
        if(data.data){
          if(localStorageService.isSupported) {
            localStorageService.set("usuario",data.data);
            $state.go('intro');

          }

        }
      }

    });
  };
  $scope.mapaPedidoMapaTab = function() {
    $state.go('tabs.detalhePedMapa');
  };

  $scope.comentariosMapaTab = function() {
    $state.go('tabs.comentario_map');

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

  $scope.carregarMais();


  var getFiles = function(fotos) {

    var i,
      files = [];
    for(i = 0; i < fotos.length; i++) {

      files.push(fotos[i].asFile());
    }

    return files;
  };

});
