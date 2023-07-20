const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//Rota pra listar os livros:
router.get('/', async (req, res) => {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
});

 router.post('/', async (req, res) => {
    const {postNomeCategoria} = req.body;

    const novaCategoria = await prisma.categoria.create({
        data: {
            nome_categoria: postNomeCategoria,
        },
    });
});

router.put('/:putIdCategoria', async (req, res) => {
    const {putNomeCategoria} = req.body;
    const {putIdCategoria} = req.params;

    const atualizaCategoria = await prisma.categoria.update({
        where: { id_categoria: Number(putIdCategoria)},
        data: { nome_categoria: putNomeCategoria },
    });
})

router.delete('/:deleteIdCategoria', async (req, res) => {
    const {deleteIdCategoria} = req.params;

    const consultaLivros = await prisma.livros.findMany({
        where: {
            id_categoria: deleteIdCategoria,
        }
    })

    if (consultaLivros == '') {
        const deleteCategoria = await prisma.categoria.delete({
            where: {
                id_categoria: Number(deleteIdCategoria),
            }
        })
    } else {
        
    }
})

module.exports = router;