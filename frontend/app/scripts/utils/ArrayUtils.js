//'use strict';
//
//(function(){
//
//  /// soma em um array determinado atributo
//  Array.prototype.sum = function (prop) {
//    var total = 0
//    for ( var i = 0, _len = this.length; i < _len; i++ ) {
//
//      if(_(this[i][prop]).isNumber()){
//
//        total += this[i][prop];
//
//      }
//
//    }
//    return total
//  };
//  Array.prototype.joinArrayObject = function (lista,campo) {
//
//    var list = _.pluck(lista, campo);
//    return list.join(', ');
//  }
//
//  //Object.prototype.objectTransformArrayByMajor = function (e) {
//  //  if(e){
//  //    var arrayRetorna = [];
//  //    var object = {};
//  //    for (var i in this) {
//  //      if(i!="objectTransformArrayByMajor"){
//  //        object[i] = this[i];
//  //        arrayRetorna.push(object);
//  //        object = {};
//  //      }
//  //    }
//  //
//  //    return arrayRetorna;
//  //  }
//  //}
//
//  Array.prototype.procura = function (dado) {
//
//    var object = _.findWhere(this, dado)
//
//    return object;
//  }
//
//  Array.prototype.extracaoFiles = function (file,_retorno) {
//    var arrayName, arrayFiles = [];
//
//    if(file instanceof Array){
//      for (i = 0; i < file.length; i++) {
//        arrayFiles.push(file[i]);
//        arrayName.push(file[i].name);
//      }
//      if(_retorno == 'NOMES_FILES'){
//        return arrayName;
//      }
//      else{
//        return arrayFiles;
//
//      }
//    }
//    if(file instanceof Object){
//      if(_retorno == 'NOMES_FILES'){
//        return file.name;
//      }
//      else{
//        return file;
//
//      }
//
//
//    }
//
//  }
//  Array.prototype.pluckByMajor = function (chave) {
//
//    var arrayDevolvido = [];
//    var object = {};
//    var array = _.pluck(this, chave);
//    if(array){
//      for (var i = 0; i < array.length; i++) {
//        object[chave] =  array[i];
//        arrayDevolvido.push(object);
//        object = {};
//      };
//      return arrayDevolvido;
//    }
//    else{
//      return null;
//    }
//
//  }
//
//	// String.prototype.arrayToList = function(){
//	// 	var v = this.join(",");
//	// 	return "v";
//	// };
//
//
//})();
