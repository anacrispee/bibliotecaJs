const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//Rota pra listar os livros:
/*router.get('/', async (req, res) => {
    const livros = await prisma.livros.findMany();
    res.json(livros);
});*/

router.get('/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params;
    const livros = await prisma.livros.findMany({
        where: {
            id_categoria: parseInt(id_categoria)
        }
    })
    res.json(livros);
})

module.exports = router;