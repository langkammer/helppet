'use strict';

(function(){
  var gen = window.exports || {};
  gen.converteDataString = function(dateTime) {
    // GET YYYY, MM AND DD FROM THE DATE OBJECT
    var yyyy = dateTime.getFullYear().toString();
    var mm = (dateTime.getMonth()+1).toString();
    var dd  = dateTime.getDate().toString();

    // CONVERT mm AND dd INTO chars
    var mmChars = mm.split('');
    var ddChars = dd.split('');

    // CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
    var dataInicio = yyyy + '-' + (mmChars[1]?mm:'0'+mmChars[0]) + '-' + (ddChars[1]?dd:'0'+ddChars[0]);
    return dataInicio;

  };
  exports.converteDataStringBr = function(dateTime) {
    // GET YYYY, MM AND DD FROM THE DATE OBJECT
    var yyyy = dateTime.getFullYear().toString();
    var mm = (dateTime.getMonth()+1).toString();
    var dd  = dateTime.getDate().toString();

    // CONVERT mm AND dd INTO chars
    var mmChars = mm.split('');
    var ddChars = dd.split('');

    // CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
    var dataInicio =  (ddChars[1]?dd:'0'+ddChars[0]) +'/' + (mmChars[1]?mm:'0'+mmChars[0]) + '/' +yyyy;
    return dataInicio;

  };
  window.app = gen;
})();
