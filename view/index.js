/* Criação de células em uma tabela */
function criarTd(data) {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};

/* Listagem de categorias existentes */
async function listarCategorias(){
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
                listarLivros(categoria.id_categoria);
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
function abrirModalCriarCat() {
    const modalNovaCategoria = document.getElementById('modalNovaCategoria');
    const inputNomeCategoria = document.getElementById('inputNomeCategoria');
    const btnInserirNovaCat = document.getElementById('btnInserirNovaCat');
    const btnCancelarNovaCat = document.getElementById('btnCancelaNovaCat');

    modalNovaCategoria.classList.toggle('show');

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
async function criarCategoria(nomeCategoria) {
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
function abrirModalEditarCat(idCategoria, nomeCategoria){
    const modalEditaCategoria = document.getElementById('modalEditaCategoria');
    const inputEditaCategoria = document.getElementById('inputEditaCategoria');
    const btnEditaCategoria = document.getElementById('btnEditaCategoria');
    const btnCancelaEditaCategoria = document.getElementById('btnCancelaEditaCategoria');

    modalEditaCategoria.classList.toggle('show');
    inputEditaCategoria.value = nomeCategoria;
    btnEditaCategoria.addEventListener('click', function(){
        editaCategoria(idCategoria);
    });
};

/* Edição de categoria: */
async function editaCategoria(idCategoria) {
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
async function deletarCategoria(idCategoria) {

    const confirma = confirm('Tem certeza que deseja excluir esta categoria? Todas os livros relacionados a ela também serão excluídos!');
    if (confirma) {
        try{
            const responseDeleteCategoria = await fetch(`/categorias/${idCategoria}`, {
                method: 'DELETE',
            });
            window.location.reload();
            alert('Categoria e livros relacionados excluídos com sucesso!');
        }catch(error){
            console.log('Erro ao excluir categoria!', error);
        };
    };
};

/* Listagem de livros de categoria específica */
async function listarLivros(idCategoria) {
    try{
        const tabelaLivros = document.getElementById('tabelaLivros');
        const btnNovoLivro = document.getElementById('btnNovoLivro');
        btnNovoLivro.addEventListener('click', () => {
            abrirModalCriarLivro(idCategoria);
        })
        tabelaLivros.classList.toggle('show');
    //    tabelaLivros.innerHTML = '';
        const responseGetLivros = await fetch(`/livros/${idCategoria}`);
        const livros = await responseGetLivros.json();

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
                editarLivro(livro.id_categoria, livro.id_livro);
            });

            btnExcluiLivro.addEventListener('click', () => {
                excluirLivro(livro.id_categoria, livro.id_livro);
            })
            
        });
    }catch(error) {
        console.log('Erro ao listar livros da categoria especificada!');
    };
};

/* Abertura de modal de criação de novo livro */
function abrirModalCriarLivro(idCategoria) {
    const modalNovoLivro = document.getElementById('modalNovoLivro');
    const inputNovoLivro = document.getElementById('inputNovoLviro');
    const inputAutorLivro = document.getElementById('inputAutorLivro');
    modalNovoLivro.classList.toggle('show');
}

/* Carregamento do conteúdo da página */
document.addEventListener('DOMContentLoaded', function (){
    
    listarCategorias();

    const btnNovaCategoria = document.getElementById('btnNovaCategoria');
    btnNovaCategoria.addEventListener('click', abrirModalCriarCat);
});