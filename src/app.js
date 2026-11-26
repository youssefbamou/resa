const path = require("path");
const express = require("express");
const cors = require("cors");
const roomsRoutes = require("./routes/rooms.routes");
const bookingsRoutes = require("./routes/bookings.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message, stack: err.stack });
});

module.exports = app;
