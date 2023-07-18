/* Função que lista as categorias existentes no banco de dados na tabela do HTML. */
async function biblioteca() {
    /* Buscando ("fetch") os dados dos arquivos "categorias.js" e "livros.js" */
    const responseCategorias = await fetch('/categorias');
    const categorias = await responseCategorias.json();

    const tabelaCategorias = document.getElementById('tabela-categorias');
    tabelaCategorias.innerHTML = '';

    //Cabeçalho da tabela de categorias de livros:
    const tRowCategorias = document.createElement('tr');
    tabelaCategorias.appendChild(tRowCategorias);

    const thIdCategorias = document.createElement('th');
    thIdCategorias.textContent = 'id';
    tRowCategorias.appendChild(thIdCategorias);

    const thNomeCategorias = document.createElement('th');
    thNomeCategorias.textContent = 'nome da categoria';
    tRowCategorias.appendChild(thNomeCategorias);

    const thBtnCategorias = document.createElement('th');
    tRowCategorias.appendChild(thBtnCategorias);

    const btnNovaCategoria = document.createElement('button');
    btnNovaCategoria.textContent = 'nova categoria';
    thBtnCategorias.appendChild(btnNovaCategoria);

    //Conteúdo da tabela de categorias:
    categorias.forEach(categoria => {

        const linhaCategoria = document.createElement('tr');
        tabelaCategorias.appendChild(linhaCategoria);

        const tdIdCategoria = document.createElement('td');
        tdIdCategoria.textContent = `${categoria.id_categoria}`;
        linhaCategoria.appendChild(tdIdCategoria);

        const tdNomeCategoria = document.createElement('td');
        tdNomeCategoria.textContent = `${categoria.nome_categoria}`;
        linhaCategoria.appendChild(tdNomeCategoria);

        const tdBtnCategoria = document.createElement('td');
        linhaCategoria.appendChild(tdBtnCategoria);

        const btnShow = document.createElement('button');
        btnShow.textContent = 'mostrar';
        tdBtnCategoria.appendChild(btnShow);
        btnShow.setAttribute('value', categoria.id_categoria);

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'editar';
        tdBtnCategoria.appendChild(btnEdit);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'deletar';
        tdBtnCategoria.appendChild(btnDelete);

        //Atribui o valor da id_categoria ao value do btnShow.
        btnShow.addEventListener('click', function(){
            const pegarIdCategoria = this.getAttribute('value');
            mostrarLivros(pegarIdCategoria);
            console.log(pegarIdCategoria);

            async function mostrarLivros(pegarIdCategoria) {
                const responseLivros = await fetch(`/livros/${pegarIdCategoria}`);
                const livros = await responseLivros.json();
        
                const tableLivros = document.getElementById('table-livros');
                const body = document.querySelector('body');
                tableLivros.innerHTML = '';

                //Tabela livros:
                livros.forEach(livro => {
                    //Tabela e cabeçalho:
                    const tabelaLivros = document.createElement('table');
                    tableLivros.appendChild(tabelaLivros);

                    const tableLivrosCaption = document.createElement('caption');
                    tableLivrosCaption.textContent = 'livros da categoria: ' + categoria.nome_categoria;
                    tabelaLivros.appendChild(tableLivrosCaption);

                    const thRowLivros = document.createElement('tr');
                    tabelaLivros.appendChild(thRowLivros);

                    const thIdLivro = document.createElement('th');
                    thRowLivros.appendChild(thIdLivro);
                    thIdLivro.textContent = 'id livro';

                    const thNomeLivro = document.createElement('th');
                    thRowLivros.appendChild(thNomeLivro);
                    thNomeLivro.textContent = 'nome livro';

                    const thAutorLivro = document.createElement('th');
                    thRowLivros.appendChild(thAutorLivro);
                    thAutorLivro.textContent = 'autor livro';

                    const thBtnNovoLivro = document.createElement('th');
                    thRowLivros.appendChild(thBtnNovoLivro);

                    const btnNovoLivro = document.createElement('button');
                    thBtnNovoLivro.appendChild(btnNovoLivro);
                    btnNovoLivro.textContent = 'novo livro';

                    //Conteúdo da tabela livros:
                    const linhaLivro = document.createElement('tr');
                    tabelaLivros.appendChild(linhaLivro);
            
                    const tdIdLivro = document.createElement('td');
                    tdIdLivro.textContent = `${livro.id_livro}`;
                    linhaLivro.appendChild(tdIdLivro);
            
                    const tdNomeLivro = document.createElement('td');
                    tdNomeLivro.textContent = `${livro.nome_livro}`;
                    linhaLivro.appendChild(tdNomeLivro);
            
                    const tdAutorLivro = document.createElement('td');
                    tdAutorLivro.textContent = `${livro.autor_livro}`;
                    linhaLivro.appendChild(tdAutorLivro);

                    const tdBtnsLivro = document.createElement('td');
                    linhaLivro.appendChild(tdBtnsLivro);

                    const btnEditLivro = document.createElement('button');
                    tdBtnsLivro.appendChild(btnEditLivro);
                    btnEditLivro.textContent = 'editar';

                    const btnExcluiLivro = document.createElement('button');
                    tdBtnsLivro.appendChild(btnExcluiLivro);
                    btnExcluiLivro.textContent = 'editar';
                });
            };
        });
    });
}