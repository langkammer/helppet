;(function() {

  'use strict';

  /**
   * @ngdoc function
   * @description
   */
  angular.module('frontendApp').service('SessaoArmazenacao', function ($cookieStore) {

    return {

      setSessao: function (dados) {
        $cookieStore.put('usuario',dados);
      },
      limparSessao: function () {
        $cookieStore.remove('usuario');
      },
      getSessao: function () {
        return $cookieStore.get('usuario');
      }


    };//fim return

  });//fim service

})();
