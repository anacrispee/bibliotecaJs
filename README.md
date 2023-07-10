# Introdução ao Nodejs
Introdução ao Nodejs, NPM, Express e Sequelize.

## O que são:
* **Nodejs:** ambiente de execução de JavaScript no lado do servidor.
* **NPM:** Node Package Manager, gerenciador de pacotes para o ecossistema Nodejs.
* **Express:** framework que gerencia requisições e respostas e gerencia rotas de servidor.
* **Sequelize:** biblioteca de ORM (Object-Relational Mapping), facilita a interação com bancos de dados relacionais usando JavaScript.

## Instalação de utilitários necessários pra rodar o projeto:
1. Instalar [Nodejs](https://nodejs.org/en) na máquina.

2. Criar o repositório do projeto no Github (ou outra ferramenta de versionamento).

3. Clonar o projeto na sua máquina pelo VSCode.

4. Acessar o diretório do projeto pelo terminal (terminal do VSCode ou CMD do seu SO) pelo comando:
    <br>```cd C:\Users\NomedoUsuario\Diretório\DiretórioDoProjeto```<br>
    No meu caso, como ele está na partição C e no Desktop, ficará:
    <br>```cd C:\Users\Ana\Desktop\intro-nodejs```<br>

5. Criar um arquivo package.json com o comando:
    <br>```npm init -y```<br>
    Ele terá as informações necessárias sobre as dependências do seu projeto.

6. Instalar o Node no diretório do seu projeto com o comando:
    <br>```npm install node```<br>
    Por meio disso ele irá instalar na pasta do seu projeto tudo que é necessário para criar um servidor.

7. Instalar o Nodemon (um utilitário que reconhece as alterações nos arquivos do seu proejto, atualizando-o sem precisar parar e iniciar o servidor criado manualmente):
   <br>```npm install nodemon```<br>

8. Instalar o Express (um framework que fornece recursos para criação de servidores web e rotas):
    <br>```npm install express```<br>

9. Instalar o Sequelize (ORM ou Objetc Relational Mapping, facilita a manipulação com o banco de dados)
    <br>```npm install sequelize```<br>
    Instalar driver para o banco de dados que será utilizado, nesse caso, MySQL:
    <br>```npm install --save mysql2```<br>

## Criando servidor com Express:
1. Criar um arquivo chamado app.js com as configurações do servidor:
```javascript
    /* Criar uma constante chamada express, atribuindo o módulo do express necessário pra criar
    o servidor usando o framework Express. */
    const express = require('express');

    /* Cria uma instância do aplicativo Express, representando o servidor web que estamos criando 
    que pode ser usada pra definir rotas. */
    const app = express();
        
    /* Intrução pro servidor "escutar" pela porta de número 3000, ou seja, o servidor está esperando
    por solicitações nessa porta. */
    app.listen(3000);
```

2. Criando rotas para o servidor:
```javascript
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
```

## Conectando banco de dados com Sequelize:
1. Crie um arquivo "bd.js", nele estarão as configurações de conexão do banco de dados:
```javascript
    /* Criação de constante importando os módulos do Sequelize instalados.*/
const Sequelize = require('sequelize');

/* Criação de uma instância adicionando as configurações de conexão com o banco de dados. */
    const sequelize = new Sequelize('mysql', 'anacrispee', 'Jesus!&', {
        host: 'localhost',
        dialect: 'mysql'
    });
```

2. Crie um trecho de código para testar a conexão do BD:
```javascript
    /* Testando a conexão do banco de dados.
    Nesse caso é feita uma promise em que, se a conexão der certo ("then"), irá imprimir uma mensagem
    de sucesso; caso contrário ("catch"), imprimirá uma mensagem de erro seguido pela descrição do erro.*/
    sequelize.authenticate().then(function(){
        console.log("Conexão com o BD realizada com sucesso!");
    }).catch(function(err){
        console.log("Erro ao conectra o banco de dados" + err);
    })
```
