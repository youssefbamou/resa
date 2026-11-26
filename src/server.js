require("dotenv").config();

// Échouer tôt, avec un message clair, si la configuration est incomplète
const required = ["DATABASE_URL"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(
    `Variable(s) d'environnement manquante(s) : ${missing.join(", ")}`,
  );
  console.error("→ copiez .env.example vers .env : cp .env.example .env");
  process.exit(1);
}

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Résa démarré sur http://localhost:${port}`);
});
