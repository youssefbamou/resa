const _ = require("lodash");
const repository = require("../repositories/bookings.repository");

const OPENING_HOUR = 8;
const CLOSING_HOUR = 18;
const MAX_DURATION_MS = 4 * 60 * 60 * 1000;

class BookingRuleError extends Error {
  constructor(message) {
    super(message);
    this.code = "BOOKING_RULE";
  }
}

function toDate(value) {
  return new Date(String(value).replace(" ", "T"));
}

function minutesOfDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function overlaps(a, b) {
  return (
    (a.start >= b.start && a.start < b.end) ||
    (a.end > b.start && a.end <= b.end)
  );
}

function checkRules(booking, existing) {
  const start = toDate(booking.start);
  const end = toDate(booking.end);
  if (
    minutesOfDay(start) < OPENING_HOUR * 60 ||
    minutesOfDay(end) > CLOSING_HOUR * 60
  ) {
    throw new BookingRuleError(
      "La salle est fermée sur ce créneau (ouverture 8h–18h)",
    );
  }
  if (end - start > MAX_DURATION_MS) {
    throw new BookingRuleError("Une réservation dure 4 heures au maximum");
  }
  const clash = existing.find((other) =>
    overlaps(
      { start, end },
      { start: toDate(other.start_at), end: toDate(other.end_at) },
    ),
  );
  if (clash) {
    throw new BookingRuleError(`Créneau déjà réservé : ${clash.title}`);
  }
}

async function listBookings() {
  return _.sortBy(await repository.findAll(), "start_at");
}

async function searchBookings(q) {
  return repository.search(q);
}

async function createBooking(input) {
  const existing = await repository.findByRoom(input.roomId);
  checkRules(input, existing);
  return repository.insert(input);
}

module.exports = {
  listBookings,
  searchBookings,
  createBooking,
  checkRules,
  BookingRuleError,
};
