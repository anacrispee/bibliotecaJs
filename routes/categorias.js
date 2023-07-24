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

//Transaction para deletar os livros que tem dentro da categoria:
    await prisma.$transaction([
        prisma.livros.deleteMany({
            where: {
                id_categoria: Number(deleteIdCategoria),
            },
        }),
        prisma.categoria.delete({
            where: {
                id_categoria: Number(deleteIdCategoria),
            },
        })
    ])

})

module.exports = router;