// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('myApp',
  ['ionic', 'leaflet-directive', 'ngCordova', 'ngMessages', 'ngMask', 'ui.utils.masks'])


.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('intro', {
        url: '/intro',
        templateUrl: 'pages/introApp.html',
        controller: 'IntroCtrl'
      })
      .state('signin', {
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html',
        controller: 'PainelCtrl'
      })
      .state('forgotpassword', {
        url: '/forgot-password',
        templateUrl: 'templates/forgot-password.html'
      })
      .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tabs.home', {
        url: '/home',
        views: {
          'home-tab': {
            templateUrl: 'templates/home.html',
            controller: 'PainelCtrl'
          }
        }
      })

      .state('tabs.detalhespedido', {
        url: '/detalhespedido',
        views: {
          'home-tab': {
            templateUrl: 'templates/detalhepedido.html',
            controller: 'PainelCtrl'

          }
        }
      })
      .state('tabs.pedidomapa', {
        url: '/pedidomapa',
        views: {
          'home-tab': {
            templateUrl: 'pages/tabs/sub_tab/mapa_pedido.html',
            controller: 'PedidoCtrl'

          }
        }
      })
      .state('tabs.comentarios', {
        url: '/comentarios',
        views: {
          'home-tab': {
            templateUrl: 'pages/tabs/sub_tab/comentarios.html',
            controller: 'PedidoCtrl'

          }
        }
      })
      .state('tabs.facts2', {
        url: '/facts2',
        views: {
          'home-tab': {
            templateUrl: 'templates/facts2.html'
          }
        }
      })
      .state('tabs.mapa', {
        url: '/mapa',
        views: {
          'map-tab': {
            templateUrl: 'templates/mapa.html',
            controller: 'MapaCtrl'

          }
        }
      });



    $urlRouterProvider.otherwise('/sign-in');



});


