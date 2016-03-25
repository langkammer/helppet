;(function() {

	'use strict';

	/**
	 * @ngdoc service
	 * @name gmrsModule.service:request
	 * @description
	 * # request
	 * Service que faz o controle das chamadas dos servidos no backend.
	 */
  angular.module('myApp')
    .service('request', function ($http) {
    var blockConfig = {
      message: '<i class="fa fa-spinner fa-spin fa-5x fa-fw margin-bottom load"></i>',
      css: {
        border:         '0',
        backgroundColor:'transparent'
      }
    };

      //var prefix = "http://192.168.0.103:9000/service/";

      var prefix = undefined;

    function BlockUtil(element){

      this.block = function(){
        if(element){
          element.block(blockConfig);
        }else{
          $.blockUI(blockConfig);
        }
      };

      this.unBlock = function(){
        if(element){
          element.unblock();
        }else{
          $.unblockUI();
        }
      };
    }

     /**
		 * JSON Headers
		 */

		var config = {
			headers: {
				'Content-type': 'application/json; charset=utf8',
				'Accept': 'application/json',
				'Cache-Control': 'no-cache',
				'X-Request': 'JSON',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
				'Access-Control-Allow-Methods': 'GET'
			}
		};

		var baseURL = '/';

		/**
		 * Configuracação dos metodos de request
		 */
		var request = {};

    request.uploadFormCode = function (servico, parameter, files, callback) {
      var block = new BlockUtil();

      block.block();

      var _url = 'service/' + servico;

      var config = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf8',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Request': 'JSON',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
          'Access-Control-Allow-Methods': 'GET'
        }
      };


      var http = $http.post(_url, $.param(parameter), files, config)

        .success(function (data) {

          callback(data);

        })
        .error(function (data, status) {

          var _message = 'Erro ao chamar a url ' + _url + ' status ' + status;

          callback(data);

          console.log(_message);

        });

      http['finally'](function(){

        block.unBlock();

      });

    };

		request.upload = function (servico, parameter, callback) {

			var _url = baseURL + servico;

			var config = {

			 method: 'POST',
       'Content-type': 'multipart/form-data',
       url: _url,

				headers: { 'Content-Type': false },

				transformRequest: function () {

					var formData = new FormData();

					formData.append('attachment', parameter);

					return formData;

				}

			};




			$http(config)
				.success(function (data) {

					callback(data);

				})
				.error(function (data, status) {

					var _message = 'Erro ao chamar a url ' + _url + ' status ' + status;

					callback(data);

					console.log(_message);

				});

		};

		request.post = function (servico, parameter, callback) {

      var block = new BlockUtil();

      block.block();

			var _url = 'service/' + servico;

			var http = $http.post(_url, JSON.stringify(parameter), config)

				.success(function (data) {

					callback(data);

				})
				.error(function (data, status) {

					var _message = 'Erro ao chamar a url ' + _url + ' status ' + status;

					callback(data);

					console.log(_message);

				});

      http['finally'](function(){

        block.unBlock();

      });

		};

		request.postFormEncoded = function (servico, parameter, callback) {
      var block = new BlockUtil();

      block.block();

      if(prefix)
        var _url = prefix + servico;
      else
        var _url = servico;


      var config = {
				headers: {
					'Content-type': 'application/x-www-form-urlencoded; charset=utf8',
					'Accept': 'application/json',
					'Cache-Control': 'no-cache',
					'X-Request': 'JSON',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
					'Access-Control-Allow-Methods': 'GET'
				}
			};

      var http = $http.post(_url, $.param(parameter), config)

				.success(function (data) {

					callback(data);

				})
				.error(function (data, status) {

					var _message = 'Erro ao chamar a url ' + _url + ' status ' + status;

					callback(data);

					console.log(_message);

				});

      http['finally'](function(){

        block.unBlock();

      });

		};


		request.get = function (url, successCallback, errorCallback) {

      var block = new BlockUtil();

      block.block();

      if(prefix)
        var url1 = prefix + url;
      else
        var url1 = prefix + url;

			var http = $http.get(url1, config.headers).

				success(function (data) {

					successCallback(data);

				}).

				error(function (data, status) {

					var _message = 'Erro ao chamar a url ' + url + ' status ' + status;

					console.log(_message);

					errorCallback(data);

				});

      http['finally'](function(){

        block.unBlock();

      });

		};

		return request;

	});//fim service

})();
