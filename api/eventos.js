import fetch from "node-fetch";
import https from "https";

// Agente HTTPS que ignora certificados inválidos
const agent = new https.Agent({
  rejectUnauthorized: false
});

export default async function handler(req, res) {
  try {
    const response = await fetch(
      
"https://agoratechpark.com.br/wp-admin/admin-ajax.php?action=request_events_search&city=&category=&search=&pastEvents=HIDE&orderBy=ASC",
      { agent }
    );

    if (!response.ok) {
      throw new Error("Falha ao buscar eventos");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API /eventos:", error);
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
}

