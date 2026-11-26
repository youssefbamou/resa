const service = require("../services/bookings.service");

async function list(req, res, next) {
  try {
    res.json(await service.listBookings());
  } catch (err) {
    next(err);
  }
}

async function search(req, res, next) {
  try {
    res.json(await service.searchBookings(req.query.q || ""));
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const booking = await service.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    if (err.code === "BOOKING_RULE") {
      res.status(409).json({ error: err.message });
      return;
    }
    next(err);
  }
}

module.exports = { list, search, create };
