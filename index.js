// index.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeEventos } from './scraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint da API (onde o site busca os eventos)
app.get('/api/eventos', (req, res) => {
  try {
    const data = fs.readFileSync('eventos.json');
    res.json(JSON.parse(data));
  } catch {
    res.json([]);
  }
});

// Atualiza os eventos automaticamente ao iniciar
scrapeEventos().catch(console.error);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

