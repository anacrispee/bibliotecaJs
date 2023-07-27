const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

//Rotas
app.use('/livros', require('./routes/livrosRouter'));
app.use('/categorias', require('./routes/categoriasRouter'));
app.use(express.static('./view'));

app.listen(port, () => {
    console.log('Servidor rodando na porta: ', port);
});