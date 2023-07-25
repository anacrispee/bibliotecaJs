const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const categoriaController = require('../controller/categoriaController');

//Lista livros existentes:
async function listaLivros (req, res) {
    const {id_categoria} = req.params;

    try{
        const livros = await prisma.livros.findMany({
            where: {
                id_categoria: parseInt(id_categoria)
            }
        });
        res.status(200).json(livros);
    }catch(error){
        res.status(404).json({message: "Erro ao listar livros."});
    }

};

//Cria novo livro:
async function criaLivro (req, res) {
    const {postNomeLivro} = req.body;
    const {postAutorLivro} = req.body;
    const {postIdCategoria} = req.params;

    try{
        const novoLivro = await prisma.livros.create({
            data: {
                nome_livro: postNomeLivro,
                autor_livro: postAutorLivro,
                id_categoria: parseInt(postIdCategoria),
            },
        });
        res.status(201).json({message: "Livro criado com sucesso!"});
    }catch(error){
        res.status(400).json({message: "Erro ao criar novo livro."});
    }

};

//Atualiza livro existente:
async function atualizaLivro (req, res) {
    const {putNomeLivro} = req.body;
    const {putAutorLivro} = req.body;
    const {putLivroIdCategoria} = req.params;
    const {putIdLivro} = req.params;

    try{
        const atualizaLivro = await prisma.livros.update({
            where: {
                id_livro: parseInt(putIdLivro),
            },
            data: {
                nome_livro: putNomeLivro,
                autor_livro: putAutorLivro,
            },
        });
        res.status(200).json({message: "Livro atualizado com sucesso!"});
    }catch(error){
        res.status(400).json({message: "Erro ao atualizar livro."});
    }

};

//Deleta livro:
async function deletaLivro (req, res) {
    const {deleteIdLivro} = req.params;

    try{
        const deleteLivro = await prisma.livros.delete({
            where: {
                id_livro: Number(deleteIdLivro),
            },
        });
        res.status(204).json({message: "Livro excluído com sucesso!"});
    }catch(error){
        res.status(400).json({message: "Erro ao excluir livro."});
    }

};

module.exports = {
    listaLivros,
    criaLivro,
    atualizaLivro,
    deletaLivro,
}