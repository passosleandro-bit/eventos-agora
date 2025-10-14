async function carregarEventos() {
  const res = await fetch('/api/eventos');
  const eventos = await res.json();
  const container = document.getElementById('eventos');
  container.innerHTML = '';

  if (eventos.length === 0) {
    container.innerHTML = '<p>Nenhum evento disponível no momento.</p>';
    return;
  }

  eventos.forEach(evento => {
    const card = document.createElement('div');
    card.classList.add('evento');
    card.innerHTML = `
      <h2>${evento.titulo}</h2>
      <p><strong>Data:</strong> ${evento.data}</p>
      <p><strong>Local:</strong> ${evento.local}</p>
      <a href="${evento.link}" target="_blank">Ver mais</a>
    `;
    container.appendChild(card);
  });
}

carregarEventos();

