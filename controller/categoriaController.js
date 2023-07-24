const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const livrosController = require('../controller/livrosController');

//Lista categorias existentes:
async function listaCategorias(req, res) {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
}

//Cria nova categoria:
async function criaCategoria (req, res) {
    const {postNomeCategoria} = req.body;

    const novaCategoria = await prisma.categoria.create({
        data: {
            nome_categoria: postNomeCategoria,
        },
    });
};

//Atualiza categoria existente:
async function atualizaCategoria (req, res) {
    const {putNomeCategoria} = req.body;
    const {putIdCategoria} = req.params;

    const atualizaCategoria = await prisma.categoria.update({
        where: { id_categoria: Number(putIdCategoria)},
        data: { nome_categoria: putNomeCategoria },
    });
};

//Deleta categoria e os livros relacionados a ela:
async function deletaCategoria (req, res) {
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
};

module.exports = {
    listaCategorias,
    criaCategoria,
    atualizaCategoria,
    deletaCategoria,
}