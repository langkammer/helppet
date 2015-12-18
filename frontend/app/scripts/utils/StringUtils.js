'use strict';

(function(){
  String.prototype.preencherEsq = function(stringAdd, tamanhoFinal) {
    var str = this;
    while (str.length < tamanhoFinal)
      str = stringAdd + str;
    return str;
  }
  String.prototype.preencherDir = function(stringAdd, tamanhoFinal) {
    var str = this;
    while (str.length < tamanhoFinal)
      str = str + stringAdd;
    return str;
  }


})();
