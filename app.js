fetch('receitas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error('O arquivo JSON não contém um array de receitas');
        }

        const receitasContainer = document.querySelector('.receitas');

        data.forEach(receita => {
            const receitaDiv = document.createElement('div');
            receitaDiv.className = 'receita';

            const titulo = document.createElement('h2');
            titulo.textContent = receita.titulo;
            receitaDiv.appendChild(titulo);

            const ingredientes = document.createElement('ul');
            receita.ingredientes.forEach(ingrediente => {
                const li = document.createElement('li');
                li.textContent = ingrediente;
                ingredientes.appendChild(li);
            });
            receitaDiv.appendChild(ingredientes);

            const preparo = document.createElement('p');
            preparo.textContent = receita.preparo;
            receitaDiv.appendChild(preparo);

            receitasContainer.appendChild(receitaDiv);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar as receitas:', error);
    });

    document.getElementById('botao-impressao').addEventListener('click', () => {
        window.print();
    });

    function exibirReceitas(data) {
        let receitasHTML = '';
    
        data.forEach(receita => {
            receitasHTML += `
                <div class="receita">
                    <img src="${receita.imagem}" alt="${receita.nome}">
                    <h2>${receita.nome}</h2>
                    <h3>Ingredientes</h3>
                    <ul>
                        ${receita.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                    </ul>
                    <h3>Preparo</h3>
                    <p>${receita.preparo}</p>
                </div>
            `;
        });
    
        document.querySelector('.receitas').innerHTML = receitasHTML;
    }