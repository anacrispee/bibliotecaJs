/* Função que lista as categorias existentes no banco de dados na tabela do HTML. */
async function biblioteca() {
    /* Buscando ("fetch") os dados dos arquivos "categorias.js" e "livros.js" */
    const responseCategorias = await fetch('/categorias');
    const categorias = await responseCategorias.json();

    const responseLivros = await fetch('/livros');
    const livros = await responseLivros.json();

    const tabela = document.getElementById('tabela-categorias');
    tabela.innerHTML = '';

    //Table Head:
    const thead = document.createElement('tr');
    const thId = document.createElement('th');
    const thNome = document.createElement('th');
    const thBtn = document.createElement('th');
    
    //Títulos nas table heads:
    thId.textContent = 'id';
    thNome.textContent = 'nome da categoria'
    // Botão na terceira teable head:
    const btnNovaCategoria = document.createElement('button');
    btnNovaCategoria.textContent = 'nova categoria';
    thBtn.appendChild(btnNovaCategoria);

    //Anexando os elementos:
    thead.appendChild(thId);
    thead.appendChild(thNome);
    thead.appendChild(thBtn);
    tabela.appendChild(thead);

    //Table content:
    categorias.forEach(categoria => {

        const linha = document.createElement('tr');
        const colunaId = document.createElement('td');
        const colunaNome = document.createElement('td');
        const colunaBtn = document.createElement('td');

        //Table rows content:
        colunaId.textContent = `${categoria.id_categoria}`;
        colunaNome.textContent = `${categoria.nome_categoria}`;

        //Botões de cada categoria:
        const btnShow = document.createElement('button');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        btnShow.textContent = 'show';
        btnEdit.textContent = 'edit';
        btnDelete.textContent = 'delete';

        //Anexando os elementos:
        colunaBtn.appendChild(btnShow);
        colunaBtn.appendChild(btnEdit);
        colunaBtn.appendChild(btnDelete);

        linha.appendChild(colunaId);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaBtn);
        tabela.appendChild(linha);

        //Tabela livros - Listagem de livros por categoria:
        const linhaLivros = document.createElement('tr');
        colunaNome.appendChild(linhaLivros);

        const tabelaLivros = document.createElement('table');
        linhaLivros.appendChild(tabelaLivros);
        tabelaLivros.style.border = '1px solid';

        const trTabelaLivros = document.createElement('tr');
        tabelaLivros.appendChild(trTabelaLivros);

        const thLivrosID = document.createElement('th');
        trTabelaLivros.appendChild(thLivrosID);
        thLivrosID.textContent = 'id';

        const thLivrosNome = document.createElement('th');
        trTabelaLivros.appendChild(thLivrosNome);
        thLivrosNome.textContent = 'nome livro';

        const thLivroAutor = document.createElement('th');
        trTabelaLivros.appendChild(thLivroAutor);
        thLivroAutor.textContent = 'autor livro';

        livros.forEach(livro => {
            const linhaLivro = document.createElement('tr');
            const colIdLivro = document.createElement('td');
            const colNomeLivro = document.createElement('td');
            const colAutorLivro = document.createElement('td');

            colIdLivro.textContent = `${livro.id_livro}`;
            colNomeLivro.textContent = `${livro.nome_livro}`;
            colAutorLivro.textContent = `${livro.autor_livro}`;

            linhaLivro.appendChild(colIdLivro);
            linhaLivro.appendChild(colNomeLivro);
            linhaLivro.appendChild(colAutorLivro);
            tabelaLivros.appendChild(linhaLivro);
        })
    })
}