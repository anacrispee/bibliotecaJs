/* Função para criação de células em uma tabela */
function criarTd(data) {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};

/* Função para listagem de categorias existentes */
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
            btnMostrarLivros.textContent = 'mostrar';

            const btnEditarCategoria = document.createElement('button');
            btnEditarCategoria.textContent = 'editar';

            const btnDeletarCategoria = document.createElement('button');
            btnDeletarCategoria.textContent = 'deletar';

            tdBtnsCategoria.appendChild(btnMostrarLivros);
            tdBtnsCategoria.appendChild(btnEditarCategoria);
            tdBtnsCategoria.appendChild(btnDeletarCategoria);

            btnEditarCategoria.addEventListener('click', function(){
                abrirModalEditarCat(categoria.id_categoria);
            })
        })
    }catch(error){
        console.log('Erro ao listar categorias', error);
    }
};

/* Função para criar nova categoria */
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

/* Abrir modal de edição de categoria */
function abrirModalEditarCat(idCategoria){
    modalEditaCategoria.classList.toggle('show');
    btnEditaCategoria.addEventListener('click', function(){
        editaCategoria(idCategoria);
    })
};

async function editaCategoria(idCategoria) {
    console.log(idCategoria);
}

/* Carregamento do conteúdo da página */
document.addEventListener('DOMContentLoaded', function (){
    
    listarCategorias();
    
    /* Modal de criação de nova categoria */
    const btnNovaCategoria = document.getElementById('btnNovaCategoria');
    const modalNovaCategoria = document.getElementById('modalNovaCategoria');
    const inputNomeCategoria = document.getElementById('inputNomeCategoria');
    const btnInserirNovaCat = document.getElementById('btnInserirNovaCat');
    const btnCancelarNovaCat = document.getElementById('btnCancelaNovaCat');

    btnNovaCategoria.addEventListener('click', function(){
        modalNovaCategoria.classList.toggle('show');
    });

    btnInserirNovaCat.addEventListener('click', function() {
        const nomeCategoria = inputNomeCategoria.value;

        if (inputNomeCategoria === '') {
            alert('Campo vazio: insira o nome da categoria a ser adicionada!');
        }else {
            criarCategoria(nomeCategoria);
        }
    })

    /* Modal de edição de categoria existente */
    const modalEditaCategoria = document.getElementById('modalEditaCategoria');
    const inputEditaCategoria = document.getElementById('inputEditaCategoria');
    const btnEditaCategoria = document.getElementById('btnEditaCategoria');
    const btnCancelaEditaCategoria = document.getElementById('btnCancelaEditaCategoria');
});