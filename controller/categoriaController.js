const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const livrosController = require('../controller/livrosController');

//Lista categorias existentes:
async function listaCategorias(req, res) {
    try{
        const categorias = await prisma.categoria.findMany();
        return res.status(200).json(categorias);
    }catch(error){
        return res.status(404).json({message: "Erro ao listar categorias!"});
    }
};

//Cria nova categoria:
async function criaCategoria (req, res) {
    const {postNomeCategoria} = req.body;

    try{
        const novaCategoria = await prisma.categoria.create({
            data: {
                nome_categoria: postNomeCategoria,
            },
        });
        return res.status(201).json({message: "Categoria criada com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao criar categoria."})
    }
};

//Atualiza categoria existente:
async function atualizaCategoria (req, res) {
    const {putNomeCategoria} = req.body;
    const {putIdCategoria} = req.params;

    try{
        const atualizaCategoria = await prisma.categoria.update({
            where: { id_categoria: Number(putIdCategoria)},
            data: { nome_categoria: putNomeCategoria },
        });
        return res.status(200).json({message: "Categoria atualizada com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao atualizar categoria."})
    }

};

//Deleta categoria e os livros relacionados a ela:
async function deletaCategoria (req, res) {
    const {deleteIdCategoria} = req.params;

//Transaction para deletar os livros que estão dentro da categoria:
    try{
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
        ]);
        return res.status(204).json({message: "Categoria deletada com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao deletar categoria."})
    }

};

module.exports = {
    listaCategorias,
    criaCategoria,
    atualizaCategoria,
    deletaCategoria,
}