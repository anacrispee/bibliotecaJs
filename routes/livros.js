const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//Rota pra listar os livros:
router.get('/', async (req, res) => {
    const livros = await prisma.livros.findMany();
    res.json(livros);
});

module.exports = router;