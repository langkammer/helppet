'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PerfilCtrl', function ($scope,$location,Mensagem) {

    $scope.adicionarPedido = function () {

      $location.path("/novo-pedido");
    };


  });
