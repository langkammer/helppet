'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', function ($scope,$location,Mensagem,UsuarioService,SessaoArmazenacao,Facebook,$rootScope) {

    if(SessaoArmazenacao.getSessao()){
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();
    }
    else{
      $scope.$parent.usuario = null;
    }

    function montaObjeto(vinculo,user){
      var objetoUsuarioDevolvido = {};
      if(vinculo=='FACEBOOK'){
        objetoUsuarioDevolvido.nome = user.nome;
        objetoUsuarioDevolvido.vinculo = vinculo;
        objetoUsuarioDevolvido.idSocial =user.idVinculoFacebook;
      }
      else{
        objetoUsuarioDevolvido = user;
        if(user.senha)
          objetoUsuarioDevolvido.senha = CryptoJS.SHA1(user.senha).toString();
      }


      return objetoUsuarioDevolvido;
    }
    function salvarUsuario(tip,user){
      var objetoSalv = montaObjeto(tip,user);

        UsuarioService.salvarUsuario({usuario : objetoSalv},function (data) {
          if (data.status == 'e') {
            Mensagem.exibir(data.message, 'error')
          } else {

            SessaoArmazenacao.setSessao(data.data);
            $('#LoginModal').modal('hide');                // initializes and invokes show immediately as
            $location.path("/perfil");


          }
        });

    }

    function verificarRedeSocial(user){
      UsuarioService.verificarRedeSocial(user.idVinculoFacebook,function (data) {
        if (data.status == 'e') {
          return false;

        } else {
          if(data.data instanceof Object){
              //caso exista login associado a rede social  será logado com ela
              SessaoArmazenacao.setSessao(data.data);
              $('#LoginModal').modal('hide');
              $location.path("/perfil");

          }
          else{
              //criando usuario caso não exista
              salvarUsuario('FACEBOOK',user);


          }

        }
      });
    }

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.slides = [
      {
        image: '../images/1.jpg',
        text: 'Ajude Animais de Ruas a serem Resgatados'
      },
      {
        image: '../images/2.jpg',
        text: 'Ajude Animais de Ruas a serem Resgatados'
      },
      {
        image: '../images/3.jpg',
        text: 'Ajude Animais de Ruas a serem Resgatados'
      }
      ,
      {
        image: '../images/4.jpg',
        text: 'Ajude Animais de Ruas a serem Resgatados'
      }
    ];


    $scope.$parent.menu = $location.path();

    $rootScope.login = function () {
      $('#LoginModal').modal('show');                // initializes and invokes show immediately

    };
    $rootScope.cadastrar = function () {
      $('#CadastrarUsuario').modal('show');                // initializes and invokes show immediately

    };

    $rootScope.reenviarSenha = function () {

      if($scope.login.user){
        Mensagem.exibir("Senha Reenviada Com sucesso no seu email","success");
      }
      else{
        Mensagem.exibir("Usuario deve ser preenchido","error");

      }

    };
    $rootScope.salvarUser = function () {

      //verifica validações de preenchimento
      salvarUsuario(null,$scope.user);
    };

    $rootScope.logarRedesocial = function (provedor) {
        // From now on you can use the Facebook service just as Facebook api says
        Facebook.login(function(response) {
          // Do something with response.
          Facebook.api('/me', function(response) {
            if(response!=null){
              var user = {
                idVinculoFacebook : response.id,
                nome : response.name
              };
              verificarRedeSocial(user);


            }


          });

        });


    };

    $rootScope.logar = function () {

      UsuarioService.logar({login : $scope.login.user, senha : CryptoJS.SHA1($scope.login.pass).toString()},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error');
        } else {

          $('#LoginModal').modal('hide');                // initializes and invokes show immediately as
          SessaoArmazenacao.setSessao(data.data);
          $location.path("/perfil");


        }
      });

    };

    $rootScope.logout = function(){

        UsuarioService.deslogar(function (data) {
          if (data.status == 'e') {
            Mensagem.exibir(data.message, 'error');
          } else {
            if($scope.usuario.idSocial)
              Facebook.logout();

            SessaoArmazenacao.limparSessao();
            Mensagem.exibir(data.message, 'success');
            $location.path("/");


          }
        });



    };

  });
