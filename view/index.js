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
function abrirModalCriarCat() {
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
            alert('Categoria e livros relacionados excluídos com sucesso!');
            window.location.reload();
        }catch(error){
            console.log('Erro ao excluir categoria!', error);
        };
    };
};

/* Listagem de livros de categoria específica */
async function listarLivros(idCategoria, nomeCategoria) {
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
function abrirModalCriarLivro(idCategoria) {
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
async function criarLivro(idCategoria, valueNovoLivro, valueAutorLivro) {
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
function abrirModalEditarLivro(idCategoriaLivro, idLivro, nomeLivro, autorLivro) {
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
async function editarLivro(idCategoriaLivro, idLivro) {
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
async function excluirLivro(idLivro) {
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

/* Carregamento do conteúdo da página */
document.addEventListener('DOMContentLoaded', function (){
    
    listarCategorias();

    const btnNovaCategoria = document.getElementById('btnNovaCategoria');
    btnNovaCategoria.addEventListener('click', abrirModalCriarCat);
});