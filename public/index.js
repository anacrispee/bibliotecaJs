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
            console.log(pegarIdCategoria);
        })
    });
}