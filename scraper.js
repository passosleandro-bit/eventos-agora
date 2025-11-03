// scraper.js
import puppeteer from 'puppeteer';
import fs from 'fs';

export async function scrapeEventos() {
  const url = 'https://agoratechpark.com.br/eventos/';

  // Usa o Chrome do Mac (caminho local)
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await autoScroll(page);

  await page.waitForSelector('div.eventos div.evento', { timeout: 30000 });

  const eventos = await page.evaluate(() => {
    const cards = document.querySelectorAll('div.eventos div.evento');
    const lista = [];

    cards.forEach(card => {
      const titulo = card.querySelector('.titulo')?.innerText.trim();
      const data = card.querySelector('.data')?.innerText.trim();
      const local = card.querySelector('.localizacao p')?.innerText.trim();
      const link = card.querySelector('.header a')?.href;

      if (titulo && data && local && link) {
        lista.push({ titulo, data, local, link });
      }
    });

    return lista;
  });

  const unicos = [];
  const vistos = new Set();
  for (const ev of eventos) {
    const chave = `${ev.titulo}-${ev.data}`;
    if (!vistos.has(chave)) {
      vistos.add(chave);
      unicos.push(ev);
    }
  }

  fs.writeFileSync('eventos.json', JSON.stringify(unicos, null, 2), 'utf8');
  console.log(`✅ Extraídos ${unicos.length} eventos únicos.`);

  await browser.close();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 400);
    });
  });
}

