/**
 * Created by Robson on 09/11/2015.
 */
'use strict';
angular.module('frontendApp').run(function($rootScope, $location, $timeout) {
  $rootScope.$on('$viewContentLoaded', function() {
    $timeout(function() {
      componentHandler.upgradeAllRegistered();
    });
  });
});
