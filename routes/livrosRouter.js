const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const categoriaController = require('../controller/categoriaController');
const livrosController = require('../controller/livrosController');

router.get('/:id_categoria', livrosController.listaLivros);

router.post('/:postIdCategoria', livrosController.criaLivro);

router.put('/:putLivroIdCategoria/:putIdLivro', livrosController.atualizaLivro);

router.delete('/:deleteIdLivro', livrosController.deletaLivro);

module.exports = router;