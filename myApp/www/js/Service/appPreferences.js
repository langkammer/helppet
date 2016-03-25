angular.module('myApp')

  .service('appPreferences', function ($q) {

    return {

      set: function (key, value) {

        var q = $q.defer();

        plugins.appPreferences.store(function (result) {

          q.resolve(result);

        }, function (err) {

          q.reject(err);

        }, key, value);

        return q.promise;

      },

      get: function (key) {

        var q = $q.defer();

        plugins.appPreferences.fetch(function (value) {

          q.resolve(value);

        }, function (err) {

          q.reject(err);

        }, key);

        return q.promise;

      },

      remove: function(key) {

        var q = $q.defer();

        plugins.appPreferences.remove(function (value) {

          q.resolve(value);

        }, function (err) {

          q.reject(err);

        }, key);

        return q.promise;

      }

    };

  });
