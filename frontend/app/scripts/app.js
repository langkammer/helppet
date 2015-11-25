'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
var app = angular.module('frontendApp',
  [ 'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'leaflet-directive',
    'ngFileUpload',
    'flow',
    'facebook'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/mapa', {
        templateUrl: 'views/mapa.html',
        controller: 'MapaCtrl'
      })
      .when('/pedido', {
        templateUrl: 'views/pedido.html',
        controller: 'PedidoCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/contato', {
        templateUrl: 'views/contato.html',
        controller: 'MainCtrl'
      })
      .when('/perfil', {
        templateUrl: 'views/perfil.html',
        controller: 'PerfilCtrl'
      })
      .when('/novo-pedido', {
        templateUrl: 'views/novo-pedido.html',
        controller: 'PedidoCtrl'
      })
      .when('/upload-pedido', {
        templateUrl: 'views/upload-foto-pedido.html',
        controller: 'PedidoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


  });
