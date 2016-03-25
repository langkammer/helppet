'use strict';

(function(){

  /// soma em um array determinado atributo
  var gen = window.exports || {};

  gen.dadosGenericos = function() {
    console.log("teste");
    return {
      estados :
        [
          {
            nome: "Amapá",
            sigla: "AP"
          },
          {
            nome: "Amazonas",
            sigla: "AM"
          },
          {
            nome: "Bahia",
            sigla: "BA"
          },
          {
            nome: "Ceará",
            sigla: "CE"
          },
          {
            nome: "Distrito Federal",
            sigla: "DF"
          },
          {
            nome: "Espírito Santo",
            sigla: "ES"
          },
          {
            nome: "Goiás",
            sigla: "GO"
          },
          {
            nome: "Maranhão",
            sigla: "MA"
          },
          {
            nome: "Mato Grosso",
            sigla: "MT"
          },
          {
            nome: "Mato Grosso do Sul",
            sigla: "MS"
          },
          {
            nome: "Minas Gerais",
            sigla: "MG"
          },
          {
            nome: "Pará",
            sigla: "PA"
          },
          {
            nome: "Paraíba",
            sigla: "PB"
          },
          {
            nome: "Paraná",
            sigla: "PR"
          },
          {
            nome: "Pernambuco",
            sigla: "PE"
          },
          {
            nome: "Piauí",
            sigla: "PI"
          },
          {
            nome: "Rio de Janeiro",
            sigla: "RJ"
          },
          {
            nome: "Rio Grande do Norte",
            sigla: "RN"
          },
          {
            nome: "Rio Grande do Sul",
            sigla: "RS"
          },
          {
            nome: "Rondônia",
            sigla: "RO"
          },
          {
            nome: "Roraima",
            sigla: "RR"
          },
          {
            nome: "Santa Catarina",
            sigla: "SC"
          },
          {
            nome: "São Paulo",
            sigla: "SP"
          },
          {
            nome: "Sergipe",
            sigla: "SE"
          },
          {
            nome: "Tocantins",
            sigla: "TO"
          }

      ],

      scripts :     {
        usuario : "CREATE TABLE IF NOT EXISTS usuario " +
                  "(" +
                  "id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"+
                  "nome	TEXT NOT NULL,"+
                  "id_sistema	INTEGER NOT NULL UNIQUE,"+
                  "id_redesocial	INTEGER UNIQUE"+
                  ");"

      }
    }
  };
  window.app.dados = gen;
})();
