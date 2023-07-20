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


router.post('/', async (req, res) => {
    const {postNomeLivro} = req.body;
    const {postAutorLivro} = req.body;
    const {postLivroIdCategoria} = req.params;

    const novoLivro = await prisma.livros.create({
        data: {
            nome_livro: postNomeLivro,
            autor_livro: postAutorLivro,
            id_categoria: postLivroIdCategoria,
        },
    });
});

router.put('/', async (req, res) => {
    const {putNomeLivro} = req.body;
    const {putAutorLivro} = req.body;
    const {putLivroIdCategoria} = req.params;

    const atualizaLivro = await prisma.livros.update({
        where: {
            id_categoria: putLivroIdCategoria,
        },
        data: {
            nome_livro: putNomeLivro,
            autor_livro: putAutorLivro,
        },
    })
})

router.delete('/', async (req, res) => {
    const {deleteIdLivro} = req.params;

    const deleteLivro = await prisma.livros.delete({
        where: {
            id_livro: deleteIdLivro,
        },
    })
})

module.exports = router;