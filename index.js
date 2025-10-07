import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });

async function extrairEventosDaUrl(url) {
  try {
    const response = await fetch(url, { agent });
    const data = await response.json();

    const dom = new JSDOM(data.html); // Pegamos o HTML interno
    const doc = dom.window.document;

    const eventos = [];
    const eventosHtml = doc.querySelectorAll('div.evento');

    eventosHtml.forEach(eventDiv => {
      const titulo = eventDiv.querySelector('div.titulo')?.textContent.trim() || '';
      const dataHora = eventDiv.querySelector('div.data')?.textContent.trim() || '';
      const link = eventDiv.querySelector('a')?.href || '';
      const imagem = eventDiv.querySelector('img')?.src || '';
      const localizacao = eventDiv.querySelector('div.localizacao p')?.textContent.trim() || '';

      eventos.push({
        title: titulo,
        date_time: dataHora,
        link: link,
        image: imagem,
        location: localizacao
      });
    });

    return eventos;
  } catch (erro) {
    console.error('Erro ao extrair eventos:', erro);
  }
}

const url = 'https://agoratechpark.com.br/wp-admin/admin-ajax.php?action=request_events_search&city=&category=&search=&pastEvents=HIDE&orderBy=ASC';

extrairEventosDaUrl(url)
  .then(eventos => console.log(eventos));

