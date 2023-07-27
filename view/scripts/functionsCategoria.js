import {
    listarLivros,
    abrirModalCriarLivro,
    criarLivro,
    abrirModalEditarLivro,
    editarLivro,
    excluirLivro,
} from './functionsLivros.js';

/* Criação de células em uma tabela */
export function criarTd(data) {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};

/* Listagem de categorias existentes */
export async function listarCategorias(){
    try {
        const responseGetCategorias = await fetch('/categorias');
        const categorias = await responseGetCategorias.json();
        const tabelaCategorias = document.getElementById('tabelaCategorias')
        tabelaCategorias.innerHTML += '';

        categorias.forEach(categoria => {
            const linhaCategoria = document.createElement('tr');

            tabelaCategorias.appendChild(linhaCategoria);
            linhaCategoria.appendChild(criarTd(categoria.id_categoria));
            linhaCategoria.appendChild(criarTd(categoria.nome_categoria));

            const tdBtnsCategoria = document.createElement('td');
            linhaCategoria.appendChild(tdBtnsCategoria);

            const btnMostrarLivros = document.createElement('button');
            const btnEditarCategoria = document.createElement('button');
            const btnDeletarCategoria = document.createElement('button');
            btnMostrarLivros.textContent = 'mostrar';
            btnEditarCategoria.textContent = 'editar';
            btnDeletarCategoria.textContent = 'deletar';
            tdBtnsCategoria.appendChild(btnMostrarLivros);
            tdBtnsCategoria.appendChild(btnEditarCategoria);
            tdBtnsCategoria.appendChild(btnDeletarCategoria);

            btnMostrarLivros.addEventListener('click', () => {
                listarLivros(categoria.id_categoria, categoria.nome_categoria);
            });

            btnEditarCategoria.addEventListener('click', () => {
                abrirModalEditarCat(categoria.id_categoria, categoria.nome_categoria);
            });

            btnDeletarCategoria.addEventListener('click', () => {
                deletarCategoria(categoria.id_categoria);
            });
        });
    }catch(error){
        console.log('Erro ao listar categorias', error);
    };
};

/* Abertura de modal de criação de nova categoria */
export function abrirModalCriarCat() {
    const modalNovaCategoria = document.getElementById('modalNovaCategoria');
    const inputNomeCategoria = document.getElementById('inputNomeCategoria');
    const btnInserirNovaCat = document.getElementById('btnInserirNovaCat');
    const btnCancelarNovaCat = document.getElementById('btnCancelaNovaCat');

    modalNovaCategoria.classList.toggle('show');
    btnCancelarNovaCat.addEventListener('click', function (){
        modalNovaCategoria.classList.remove('show');
    });

    btnInserirNovaCat.addEventListener('click', function() {
        const nomeCategoria = inputNomeCategoria.value;

        if (inputNomeCategoria.value === '') {
            alert('Campo vazio: insira o nome da categoria a ser adicionada!');
        }else {
            criarCategoria(nomeCategoria);
        };
    });
};

/* Criação de nova categoria */
export async function criarCategoria(nomeCategoria) {
    try {
        const responsePostCategoria = await fetch('/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postNomeCategoria: nomeCategoria,
            }),
        });
    }catch(error) {
        console.log('Erro ao criar nova categoria', error);
    };
};

/* Abertura do modal de edição de categoria */
export function abrirModalEditarCat(idCategoria, nomeCategoria){
    const modalEditaCategoria = document.getElementById('modalEditaCategoria');
    const inputEditaCategoria = document.getElementById('inputEditaCategoria');
    const btnEditaCategoria = document.getElementById('btnEditaCategoria');
    const btnCancelaEditaCat = document.getElementById('btnCancelaEditaCat');

    modalEditaCategoria.classList.toggle('show');
    btnCancelaEditaCat.addEventListener('click', function (){
        modalEditaCategoria.classList.remove('show');
    });

    inputEditaCategoria.value = nomeCategoria;
    btnEditaCategoria.addEventListener('click', function(){
        editaCategoria(idCategoria);
    });
};

/* Edição de categoria: */
export async function editaCategoria(idCategoria) {
    if (inputEditaCategoria.value === '') {
        alert('Campo vazio! Insira o nome da categoria!');
    }else {
        try{
            const responseEditaCategoria = await fetch(`/categorias/${idCategoria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    putNomeCategoria: inputEditaCategoria.value,
                }),
            });
        }catch(error){
            console.log('Erro ao atualizar categoria!', error);
        };
    };
};

/* Exclusão de categoria */
export async function deletarCategoria(idCategoria) {

    const confirma = confirm('Tem certeza que deseja excluir esta categoria? Todas os livros relacionados a ela também serão excluídos!');
    if (confirma) {
        try{
            const responseDeleteCategoria = await fetch(`/categorias/${idCategoria}`, {
                method: 'DELETE',
            });
            alert('Categoria e livros relacionados excluídos com sucesso!');
            window.location.reload();
        }catch(error){
            console.log('Erro ao excluir categoria!', error);
        };
    };
};