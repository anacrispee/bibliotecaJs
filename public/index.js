/* Função que lista as categorias existentes no banco de dados na tabela do HTML. */
async function biblioteca() {
    /* Buscando ("fetch") os dados dos arquivos "categorias.js" e "livros.js" */
    const responseCategorias = await fetch('/categorias');
    const categorias = await responseCategorias.json();

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
        tabela.appendChild(linha);

        const colunaId = document.createElement('td');
        colunaId.textContent = `${categoria.id_categoria}`;
        linha.appendChild(colunaId);

        const colunaNome = document.createElement('td');
        colunaNome.textContent = `${categoria.nome_categoria}`;
        linha.appendChild(colunaNome);

        const colunaBtn = document.createElement('td');
        const btnShow = document.createElement('button');
        const btnEdit = document.createElement('button');
        const btnDelete = document.createElement('button');
        btnShow.textContent = 'show';
        btnEdit.textContent = 'edit';
        btnDelete.textContent = 'delete';
        colunaBtn.appendChild(btnShow);
        colunaBtn.appendChild(btnEdit);
        colunaBtn.appendChild(btnDelete);
        linha.appendChild(colunaBtn);

        const tableLivro = document.createElement('table');
        colunaNome.appendChild(tableLivro);

    })
}