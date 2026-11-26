const { Pool, types } = require("pg");

types.setTypeParser(1114, (value) => value);

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://resa:Resa2026!Bdx@localhost:5432/resa",
});

pool.on("error", (err) => {
  console.error("PostgreSQL :", err.message);
});

module.exports = pool;
