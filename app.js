const express = require("express");
const app = express();

// Serve per leggere body JSON (per dopo)
app.use(express.json());

// TOKEN DI VERIFICA (deve essere IDENTICO a quello che metti su Meta)
const VERIFY_TOKEN = "n8n_verify";

// ENDPOINT DI VERIFICA WEBHOOK
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificato correttamente");
    return res.status(200).send(challenge);
  } else {
    console.log("Verifica webhook fallita");
    return res.sendStatus(403);
  }
});

// ENDPOINT PER MESSAGGI (POST) — per dopo
app.post("/webhook", (req, res) => {
  console.log("Evento ricevuto:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// AVVIO SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
});
