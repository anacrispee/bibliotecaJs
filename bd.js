/* Criação de constante importando os módulos do Sequelize instalados.*/
const Sequelize = require('sequelize');

/* Criação de uma instância adicionando as configurações de conexão com o banco de dados. */
const sequelize = new Sequelize('bibliotecanodejs', 'anacrispee', 'Jesus!&', {
    host: 'localhost',
    dialect: 'mysql'
});

/* Testando a conexão do banco de dados.
Nesse caso é feita uma promise em que, se a conexão der certo ("then"), irá imprimir uma mensagem
de sucesso; caso contrário ("catch"), imprimirá uma mensagem de erro seguido pela descrição do erro.*/
sequelize.authenticate().then(function(){
    console.log("Conexão com o BD realizada com sucesso!");
}).catch(function(err){
    console.log("Erro ao conectra o banco de dados" + err);
})