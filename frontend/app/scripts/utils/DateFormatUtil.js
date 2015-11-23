'use strict';

(function(){


  //parse automatico de data
  Date.prototype.parseData = function () {
       return converteDataStringBr(this);
  };

  String.prototype.parseData = function () {
      return this;
  };

  String.prototype.parseStringDate = function () {
        return new Date(this);
  };

   function converteDataString(dateTime) {
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
  function converteDataStringBr(dateTime) {
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
})();
