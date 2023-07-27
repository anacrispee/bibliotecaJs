import {
    listarCategorias,
    abrirModalCriarCat,
    criarCategoria,
    abrirModalEditarCat,
    editaCategoria,
    deletarCategoria,
} from './functionsCategoria.js';

import {
    listarLivros,
    abrirModalCriarLivro,
    criarLivro,
    abrirModalEditarLivro,
    editarLivro,
    excluirLivro,
} from './functionsLivros.js';

/* Carregamento do conteúdo da página */
document.addEventListener('DOMContentLoaded', function (){
    
    listarCategorias();

    const btnNovaCategoria = document.getElementById('btnNovaCategoria');
    btnNovaCategoria.addEventListener('click', abrirModalCriarCat);
});