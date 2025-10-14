async function carregarEventos() {
  try {
    const response = await fetch('eventos.json');
    if (!response.ok) throw new Error('Erro ao carregar eventos');
    const eventos = await response.json();
    exibirEventos(eventos);
  } catch (error) {
    console.error(error);
    document.getElementById('eventos').innerHTML = '<p>Erro ao 
carregar eventos.</p>';
  }
}

function exibirEventos(eventos) {
  const container = document.getElementById('eventos');
  container.innerHTML = '';
  eventos.forEach(ev => {
    const card = document.createElement('div');
    card.classList.add('evento');
    card.innerHTML = `
      <div class="header">
        <div class="titulo">${ev.titulo}</div>
        <div class="localizacao">${ev.localizacao}</div>
      </div>
      <div class="data">${ev.data}</div>
    `;
    container.appendChild(card);
  });
}

carregarEventos();

