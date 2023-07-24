const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const categoriaController = require('../controller/categoriaController');
const livrosController = require('../controller/livrosController');

router.get('/', categoriaController.listaCategorias);

router.post('/', categoriaController.criaCategoria);

router.put('/:putIdCategoria', categoriaController.atualizaCategoria);

router.delete('/:deleteIdCategoria', categoriaController.deletaCategoria);

module.exports = router;