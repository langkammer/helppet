'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', function ($scope) {

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

  });
