import handler from './api/eventos.js';

handler({}, {
  status: (code) => ({
    json: (data) => {
      console.log("Status:", code);
      console.log("Eventos recebidos:", data);
    }
  }),
  setHeader: () => {} // necessário para a API
});

