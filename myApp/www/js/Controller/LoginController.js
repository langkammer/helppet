app.controller('LoginCtrl', function($scope,$state,UsuarioService, Mensagem,localStorageService,$cordovaPreferences,$q,appPreferences) {
  // Called to navigate to the main app


  var autenticar = function(usuario) {

    $q.all([

      appPreferences.set('usuario', usuario.id),

    ]).then(function(result) {

      $state.go('intro');
      $scope.user.username = '';
      $scope.user.password = '';

    }, function(error) {

      Mensagem("Error","Ocorreu um erro ao definir os dados do usuário. Procure o adminstrador do sistema.");
    });
  };
  $scope.signIn = function(user) {
    UsuarioService.logar({login : user.username, senha: CryptoJS.SHA1(user.password).toString()},function (data) {
      if (data.status == 'e') {
        Mensagem.exibir('error',data.message);
      } else {
        if(data.data){
          if(localStorageService.isSupported) {
            autenticar(data.data);
            $state.go('intro');

          }

        }
      }

    });
  };
});
