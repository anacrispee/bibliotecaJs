const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//Rota pra listar os livros:
router.get('/', async (req, res) => {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
});

/* router.post('/', async (req, res) => {

}) */

module.exports = router;