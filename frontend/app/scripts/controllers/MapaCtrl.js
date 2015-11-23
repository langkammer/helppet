'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MapaCtrl', function ($scope,$location) {

      console.log("mapa");

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
        lat: 51.505,
        lng: -0.09,
        zoom: 30
      }
    });
  });
