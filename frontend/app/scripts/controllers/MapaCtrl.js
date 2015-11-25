'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MapaCtrl', function ($scope,$location,SessaoArmazenacao) {

      console.log("mapa");

    if(SessaoArmazenacao.getSessao())
      $scope.$parent.usuario  = SessaoArmazenacao.getSessao();

    $scope.$parent.menu = $location.path();

    $scope.menu = true;

    $scope.altura =  $(window).height()  + 'px';
    $scope.center = {};
    //$scope.map = {
    //  defaults: {
    //    tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    //    maxZoom: 18,
    //    zoomControlPosition: 'bottomleft'
    //  }
    //};
    angular.extend($scope, {
      center: {
        lat: -19.922681,
        lng: -43.944540,
        zoom: 15
      }
    });
  });
