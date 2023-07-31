import { Categoria } from './categoriasManager.js';

import { Livros } from './livrosManager.js';

/* Criação de células em uma tabela */
export function criarTd(data) {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};

/* Carregamento do conteúdo da página */
document.addEventListener('DOMContentLoaded', function (){
    
    const categoria = new Categoria();
    const livros = new Livros();
    categoria.listarCategorias();

    const btnNovaCategoria = document.getElementById('btnNovaCategoria');
    btnNovaCategoria.addEventListener('click', categoria.abrirModalCriarCat.bind(categoria));
});