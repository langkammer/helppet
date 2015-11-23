'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', function ($scope,$location,Mensagem,UsuarioService,SessaoArmazenacao,Facebook) {

    if(SessaoArmazenacao.getSessao())
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();

    function montaObjeto(vinculo,user){
      var objetoUsuarioDevolvido = {};
      if(vinculo=='FACEBOOK'){
        objetoUsuarioDevolvido.nome = user.nome;
        objetoUsuarioDevolvido.vinculo = vinculo;
      }
      else{
        objetoUsuarioDevolvido = user;
        if(user.senha)
          objetoUsuarioDevolvido.senha = CryptoJS.SHA1(user.senha).toString();
      }


      return objetoUsuarioDevolvido;
    }
    function salvarUsuario(tip,user){

      if(verificarRedeSocial(user.idVinculoFacebook)){
        var objetoSalv = montaObjeto(tip,user);

        UsuarioService.salvarUsuario({usuario : objetoSalv},function (data) {
          if (data.status == 'e') {
            Mensagem.exibir(data.message, 'error')
          } else {

            SessaoArmazenacao.setSessao(data.data);
            $location.path("/perfil");


          }
        });

      }

    }

    function verificarRedeSocial(idRedeSocial){
      UsuarioService.verificarRedeSocial(idRedeSocial,function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
          return data.data;

        } else {
          return data.data.idSocial;
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

    $scope.$parent.login = function () {
      $('#LoginModal').modal('show')                // initializes and invokes show immediately

    };
    $scope.$parent.cadastrar = function () {
      $('#CadastrarUsuario').modal('show')                // initializes and invokes show immediately

    };

    $scope.$parent.reenviarSenha = function () {

      if($scope.login.user){
        Mensagem.exibir("Senha Reenviada Com sucesso no seu email","success");
      }
      else{
        Mensagem.exibir("Usuario deve ser preenchido","error");

      }

    };
    $scope.$parent.cadastrar = function () {

      //verifica validações de preenchimento
      salvarUsuario(null,$scope.user);
    };

    $scope.$parent.logarRedesocial = function (provedor) {

      Facebook.api('/me', function(response) {
        if(response!=null){
          var user = {
            idVinculoFacebook : response.id,
            nome : response.name
          }
          salvarUsuario('FACEBOOK',user);

        }


      });

    };

    $scope.$parent.logar = function () {

      UsuarioService.logar({login : $scope.login.user, senha : CryptoJS.SHA1($scope.login.pass).toString()},function (data) {
        if (data.status == 'e') {
          Mensagem.exibir(data.message, 'error')
        } else {

          SessaoArmazenacao.setSessao(data.data);
          $location.path("/perfil");


        }
      });

    };

  });
