const { Pool, types } = require("pg");

types.setTypeParser(1114, (value) => value);

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL manquante : copiez .env.example vers .env (cp .env.example .env)",
  );
}

const pool = new Pool({ connectionString });

pool.on("error", (err) => {
  console.error("PostgreSQL :", err.message);
});

module.exports = pool;
