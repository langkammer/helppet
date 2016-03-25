app.controller('PerfilCtrl', function($scope, $state, $ionicSlideBoxDelegate,localStorageService,PedidoService,Mensagem,UsuarioService) {

  $scope.user = localStorageService.get("usuario");

  $scope.listaPedidos = [];

  $scope.carregarMais = function() {
    PedidoService.listarPedidosUsuario({idUsuario : localStorageService.get("usuario").id },function (data) {
      if (data.status == 'e') {
        Mensagem.exibir('error',data.message);
      } else {
        if(data.data){
          $scope.listaPedidos = data.data;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      }

    });
  };

  $scope.carregarMais();


  $scope.deslogar = function() {
    UsuarioService.deslogar(function (data) {
      if (data.status == 'e') {
        Mensagem.exibir('error',data.message);
      } else {
        Mensagem.exibir('Sucesso!',data.message);
        if(localStorageService.isSupported) {
          localStorageService.cookie.remove("usuario");

        }
        $state.go('signin');

      }

    });
  };

})
