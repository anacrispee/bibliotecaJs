# Introdução ao Nodejs
Introdução ao Nodejs, NPM, Express e Prisma.

## O que são:
* **Nodejs:** ambiente de execução de JavaScript no lado do servidor.
* **NPM:** Node Package Manager, gerenciador de pacotes para o ecossistema Nodejs.
* **Express:** framework que gerencia requisições e respostas e gerencia rotas de servidor.
* **Prisma:** biblioteca de ORM (Object-Relational Mapping), facilita a interação com bancos de dados relacionais usando JavaScript.

## Instalação dos utilitários necessários pra rodar o projeto:
1. Instalar [Nodejs](https://nodejs.org/en) na máquina.

2. Criar o repositório do projeto no Github (ou outra ferramenta de versionamento).

3. Clonar o projeto na sua máquina pelo VSCode.

4. Acessar o diretório do projeto pelo terminal (terminal do VSCode ou CMD do seu SO) pelo comando:
    <br>```cd C:\Users\NomedoUsuario\Diretório\DiretórioDoProjeto```<br>
    No meu caso, como ele está na partição C e no Desktop, ficará:
    <br>```cd C:\Users\Ana\Desktop\intro-nodejs```<br>

5. Criar um arquivo package.json com o comando (um arquivo que conterá as informações necessárias sobre as dependências do seu projeto):
    <br>```npm init -y```<br>

6. Instalar o Node no diretório do seu projeto com o comando:
    <br>```npm install nodejs```<br>

7. Instalar o Nodemon (um utilitário que reconhece as alterações nos arquivos do seu projeto, atualizando-o sem precisar parar e iniciar o servidor criado manualmente):
   <br>```npm install nodemon```<br>

8. Instalar o Express:
    <br>```npm install express```<br>

9. Instalar o Prisma:
    <br>```npm install prisma --save-dev```<br>

10. Instalar o Prisma CLI (Comand Line Interface):
    <br>```npx prisma```<br>

11. Criar o modelo de arquivo de schema:
    <br>```npx prisma init```<br>

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

## Conectando banco de dados com Prisma:
1. Será criado no diretório do projeto um arquivo chamado "schema.prisma" já pré preenchido, onde será necessário apenas colocar as informações referentes ao seu banco de dados:
```prisma
   generator client {
  provider = "prisma-client-js"
}

//Na propriedade "provider" o valor será o seu banco de dados, e a "url" será as informações de coneção para o seu BD.
datasource db {
  provider = "mysql"
  url      = "mysql://anacrispee:Jesus!&@localhost:3306/bibliotecanodejs"
}
```
### Configurando o Prisma para o projeto:
1. Introduza ao Prisma os dados do seu banco com o seguinte comando no terminal:
   <br>```npx prisma db pull```<br>

2. Em seguida, acesse o Prisma Studio, uma interface onde você consegue visualizar o seu banco e verificar se a conexão deu certo:
   <br>```npx prisma studio```<br>

3. Instale o Prisma Client, uma biblioteca que fornece uma interface de programação para acessar e manipular dados:
   <br>```npm install @prisma/client```<br>
   Depois é preciso **gerar** o Prisma Client com o código:
   <br>```npx prisma generate```<br>

### Definindo o banco de dados com Prisma:
No arquivo "schema.prisma", você define as tabelas do seu banco:
Nos modelos estão o nome da categoria, o tipo de dado e as informações adicionais, como por exemplo "autoincrement".
```prisma
model categoria {
  id_categoria   Int      @id @default(autoincrement())
  nome_categoria String   @db.VarChar(45)
  livros         livros[]
}

model livros {
  id_livro     Int       @id @default(autoincrement())
  nome_livro   String?   @db.VarChar(45)
  autor_livro  String?   @db.VarChar(45)
  id_categoria Int
  categoria    categoria @relation(fields: [id_categoria], references: [id_categoria], onDelete: NoAction, onUpdate: NoAction, map: "id_categoriafk")

  @@index([id_categoria], map: "id_categoriafk")
}
```

### Querys com Prisma:
Você irá criar um arquivo que pode ter nome "index.js", onde terão todas as suas querys com seu banco de dados. Ele terá a seguinte estrutura:
```javascript
/* Importando o PrismaClient constructor do módulo do Prisma do Node e o instanciando */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* Cria uma função assíncrona onde alocará as manipulações com o banco de dados. */
async function main() {
  //Aqui dentro dessa função assíncrona você vai colocar suas querys.
}

/* Chama a função "main" criada e a fecha quando finalizada a manipulação com BD. ("process.exit"). */
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```
#### Consultando o banco de dados com FindMany():
"SELECT * FROM categorias"
```javascript
    const allCategorias = await prisma.categoria.findMany()
    console.log(allCategorias)
```
#### Inserindo dados em uma tabela:
```javascript
  await prisma.livros.create({
    data: {
      nome_livro: 'Mil Ervas e Fungos Mágicos',
      autor_livro: 'Fílida Spore',
      id_categoria: 1,
      },
})
```
