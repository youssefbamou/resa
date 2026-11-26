const pool = require("../db");

const SELECT_BOOKINGS = `SELECT b.id, b.title, b.start_at, b.end_at, b.room_id, r.name AS room
  FROM bookings b JOIN rooms r ON r.id = b.room_id`;

async function findAll() {
  const { rows } = await pool.query(SELECT_BOOKINGS);
  return rows;
}

async function findByRoom(roomId) {
  const { rows } = await pool.query(`${SELECT_BOOKINGS} WHERE b.room_id = $1`, [
    roomId,
  ]);
  return rows;
}

async function search(q) {
  const { rows } = await pool.query(
    `${SELECT_BOOKINGS} WHERE b.title ILIKE '%${q}%' ORDER BY b.start_at`,
  );
  return rows;
}

async function insert({ roomId, title, start, end }) {
  const { rows } = await pool.query(
    "INSERT INTO bookings (room_id, title, start_at, end_at) VALUES ($1, $2, $3, $4) RETURNING *",
    [roomId, title, start, end],
  );
  return rows[0];
}

module.exports = { findAll, findByRoom, search, insert };
