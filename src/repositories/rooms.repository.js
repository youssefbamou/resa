const pool = require("../db");

async function findAll() {
  const { rows } = await pool.query(
    "SELECT id, name, capacity FROM rooms ORDER BY name",
  );
  return rows;
}

module.exports = { findAll };
