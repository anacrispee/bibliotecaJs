import {
    listarCategorias,
    abrirModalCriarCat,
    criarCategoria,
    abrirModalEditarCat,
    editaCategoria,
    deletarCategoria,
    criarTd,
} from './functionsCategoria.js';

/* Listagem de livros de categoria específica */
export async function listarLivros(idCategoria, nomeCategoria) {
    try{
        const tabelaLivros = document.getElementById('tabelaLivros');

        tabelaLivros.classList.toggle('show');
        tabelaLivros.innerHTML = '';

        const responseGetLivros = await fetch(`/livros/${idCategoria}`);
        const livros = await responseGetLivros.json();

                /* Caption especificando a tabela aberta */
                const captionTabelaLivros = document.createElement('caption');
                captionTabelaLivros.textContent = 'livros da categoria: ' + nomeCategoria;
                tabelaLivros.appendChild(captionTabelaLivros);

                /* Cabeçalho da tabela livros */
                const linhaHeader = document.createElement('tr');
                tabelaLivros.appendChild(linhaHeader);
                linhaHeader.appendChild(criarTd('id'));
                linhaHeader.appendChild(criarTd('título'));
                linhaHeader.appendChild(criarTd('autor'));

                const tdBtnNovoLivro = document.createElement('td');
                const btnNovoLivro = document.createElement('button');
                btnNovoLivro.addEventListener('click', function(){
                    abrirModalCriarLivro(idCategoria);
                })
                btnNovoLivro.textContent = 'novo livro';
                linhaHeader.appendChild(tdBtnNovoLivro);
                tdBtnNovoLivro.appendChild(btnNovoLivro);

        livros.forEach(livro => {
            const linhaLivro = document.createElement('tr');
            tabelaLivros.appendChild(linhaLivro);

            linhaLivro.appendChild(criarTd(livro.id_livro));
            linhaLivro.appendChild(criarTd(livro.nome_livro));
            linhaLivro.appendChild(criarTd(livro.autor_livro));

            const tdBtnsLivro = document.createElement('td');
            linhaLivro.appendChild(tdBtnsLivro);

            const btnEditarLivro = document.createElement('button');
            const btnExcluiLivro = document.createElement('button');
            btnEditarLivro.textContent = 'editar';
            btnExcluiLivro.textContent = 'excluir';
            tdBtnsLivro.appendChild(btnEditarLivro);
            tdBtnsLivro.appendChild(btnExcluiLivro);

            btnEditarLivro.addEventListener('click', () => {
                abrirModalEditarLivro(livro.id_categoria, livro.id_livro, livro.nome_livro, livro.autor_livro);
            });

            btnExcluiLivro.addEventListener('click', () => {
                excluirLivro(livro.id_livro);
            })
        });
    }catch(error) {
        console.log('Erro ao listar livros da categoria especificada!', error);
    };
};

/* Abertura de modal de criação de novo livro */
export function abrirModalCriarLivro(idCategoria) {
    const modalNovoLivro = document.getElementById('modalNovoLivro');
    const inputNovoLivro = document.getElementById('inputNovoLivro');
    const inputAutorLivro = document.getElementById('inputAutorLivro');
    const btnInserirNovoLivro = document.getElementById('btnInserirNovoLivro');
    const btnCancelaNovoLivro = document.getElementById('btnCancelaNovoLivro');

    modalNovoLivro.classList.toggle('show');
    btnCancelaNovoLivro.addEventListener('click', function(){
        modalNovoLivro.classList.remove('show');
    })

    btnInserirNovoLivro.addEventListener('click', function() {
        if ((inputNovoLivro.value === '') && (inputAutorLivro.value === '')) {
            alert('Campos vazios: preencha os campos corretamente!');
        }else{
            const valueNovoLivro = inputNovoLivro.value;
            const valueAutorLivro = inputAutorLivro.value;
            criarLivro(idCategoria, valueNovoLivro, valueAutorLivro);
        };
    })
};

/* Criação de novo livro */
export async function criarLivro(idCategoria, valueNovoLivro, valueAutorLivro) {
    try{
        const responsePostLivro = await fetch(`/livros/${idCategoria}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postNomeLivro: valueNovoLivro,
                postAutorLivro: valueAutorLivro,
            })
        });
    }catch(error){
        console.log('Erro ao criar livro!');
    };
};

/* Abertura do modal de edição de livro */
export function abrirModalEditarLivro(idCategoriaLivro, idLivro, nomeLivro, autorLivro) {
    const modalEditaLivro = document.getElementById('modalEditaLivro');
    const inputEditaLivro = document.getElementById('inputEditaLivro');
    const inputEditaAutorLivro = document.getElementById('inputEditaAutorLivro');
    const btnEditaLivro = document.getElementById('btnEditaLivro');
    const btnCancelaEditaLivro = document.getElementById('btnCancelaEditaLivro');

    modalEditaLivro.classList.toggle('show');
    btnCancelaEditaLivro.addEventListener('click', function(){
        modalEditaLivro.classList.remove('show');
    }); 

    inputEditaLivro.value = nomeLivro;
    inputEditaAutorLivro.value = autorLivro;

    btnEditaLivro.addEventListener('click', function(){
        editarLivro(idCategoriaLivro, idLivro);
    });
};

/* Edição de livro */
export async function editarLivro(idCategoriaLivro, idLivro) {
    if (inputEditaLivro.value === '' || inputEditaAutorLivro.value === '') {
        alert('Campos vazios! Preencha os campos solicitados!');
    }else{
        try{
            const responseEditaLivro = await fetch(`/livros/${idCategoriaLivro}/${idLivro}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    putNomeLivro: inputEditaLivro.value,
                    putAutorLivro: inputEditaAutorLivro.value,
                }),
            });
        }catch(error){
            console.log('Erro ao editar livro!', error);
        };
    };
};

/* Exclusão de livro: */
export async function excluirLivro(idLivro) {
    const confirma = confirm('Tem certeza que deseja excluir este livro?');
    if (confirma) {
        try{
            const responseExcluiLivro = await fetch(`/livros/${idLivro}`, {
                method: 'DELETE',
            });
            alert('Livro excluído com sucesso!');
            window.location.reload();
        }catch(error){
            console.log('Erro ao excluir livro', error);
        };
    };
;}