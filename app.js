/* Criar uma constante chamada express, atribuindo o módulo do express necessário pra criar
o servidor usando o framework Express. */
const express = require('express');

/* Cria uma instância do aplicativo Express, representando o servidor web que estamos criando 
que pode ser usada pra definir rotas. */
const app = express();

/* Cria uma instância paara importar as configurações de conexão do banco de dados
do arquivo "bd.js" */
const bd = require("./bd");

/* Definição da rota raíz ("/") com a definição de uma função de requisição e resposta HTTP.
Neste caso, a resposta está enviando um "Hello World" para o cliente (res.send). */
app.get("/", function(req, res) {
    res.send('Hello World!');
});

/* Definição de uma rota específica que irá se chamar "/incio", cuja response vai ser enviar um
arquivo ("senFile") cujo nome do diretório ("__dirname) é  "index.html" que está na pasta "frontend". */
app.get("/inicio", function(req, res){
    res.sendFile(__dirname + "/frontend/index.html");
})

/* Intrução pro servidor "escutar" pela porta de número 3000, ou seja, o servidor está esperando
por solicitações nessa porta. */
app.listen(3000);