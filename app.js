fetch('receitas.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON')
    }
    return response.json()
  })
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error('O arquivo JSON não contém um array de receitas')
    }

    const receitasContainer = document.querySelector('.receitas')
    let receitasHTML = ''

    data.forEach(receita => {
      receitasHTML += `
                <div class="receita">
                    <img src="${receita.imagem}" alt="${receita.nome}">
                    <h2>${receita.nome}</h2>
                    <h3>Ingredientes</h3>
                    <ul>
                        ${receita.ingredientes
                          .map(ingrediente => `<li>${ingrediente}</li>`)
                          .join('')}
                    </ul>
                    <h3>Preparo</h3>
                    <p>${receita.preparo}</p>
                </div>
            `
      document.querySelector('.receitas').innerHTML = receitasHTML
    })
  })
  .catch(error => {
    console.error('Erro ao carregar as receitas:', error)
  })

document.getElementById('botao-impressao').addEventListener('click', () => {
  window.print()
})
