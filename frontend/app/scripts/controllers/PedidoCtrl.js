'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PedidoCtrl', function ($scope) {

      console.log("main");

    $scope.cidades = [
      {
      id : 1,
      nome : 'MG'
      },
      {
        id : 2,
        nome : 'MG'
      },
      {
        id : 3,
        nome : 'SP'
      },
      {
        id : 4,
        nome : 'RJ'
      }
    ];
    setTimeout(function(){
      $("#usuarios").chosen();
    },5);

    $scope.muda = function() {

      if($scope.cidades == undefined) {
        return;
      }

      if(_.findWhere($scope.usuariosAdicionados, {nome :$scope.user.nome}) != undefined) {

        return;
      }

      $scope.usuariosAdicionados.push($scope.user);

    };
  });
