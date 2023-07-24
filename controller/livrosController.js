const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const categoriaController = require('../controller/categoriaController');

//Lista livros existentes:
async function listaLivros (req, res) {
    const {id_categoria} = req.params;
    const livros = await prisma.livros.findMany({
        where: {
            id_categoria: parseInt(id_categoria)
        }
    })
    res.json(livros);
};

//Cria novo livro:
async function criaLivro (req, res) {
    const {postNomeLivro} = req.body;
    const {postAutorLivro} = req.body;
    const {postIdCategoria} = req.params;

    const novoLivro = await prisma.livros.create({
        data: {
            nome_livro: postNomeLivro,
            autor_livro: postAutorLivro,
            id_categoria: parseInt(postIdCategoria),
        },
    });
};

//Atualiza livro existente:
async function atualizaLivro (req, res) {
    const {putNomeLivro} = req.body;
    const {putAutorLivro} = req.body;
    const {putLivroIdCategoria} = req.params;
    const {putIdLivro} = req.params;

    const atualizaLivro = await prisma.livros.update({
        where: {
            id_livro: parseInt(putIdLivro),
        },
        data: {
            nome_livro: putNomeLivro,
            autor_livro: putAutorLivro,
        },
    });
};

//Deleta livro:
async function deletaLivro (req, res) {
    const {deleteIdLivro} = req.params;

    const deleteLivro = await prisma.livros.delete({
        where: {
            id_livro: Number(deleteIdLivro),
        },
    });
};

module.exports = {
    listaLivros,
    criaLivro,
    atualizaLivro,
    deletaLivro,
}