async function carregarEventos() {
  try {
    const res = await fetch('/api/eventos');
    const eventos = await res.json();

    const painel = document.getElementById('painel');
    painel.innerHTML = '';

    eventos.forEach(ev => {
      const div = document.createElement('div');
      div.className = 'evento';
      div.innerHTML = `
        <h2>${ev.titulo}</h2>
        <p><strong>Data:</strong> ${ev.data}</p>
        <p><strong>Local:</strong> ${ev.local}</p>
        <a href="${ev.link}" target="_blank">Mais detalhes</a>
      `;
      painel.appendChild(div);
    });

  } catch (err) {
    console.error('Erro ao carregar eventos:', err);
  }
}

// Atualiza a cada 60 segundos
carregarEventos();
setInterval(carregarEventos, 60000);

