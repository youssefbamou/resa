async function loadRooms() {
  const res = await fetch("/api/rooms");
  const rooms = await res.json();
  document.getElementById("room").innerHTML = rooms
    .map(
      (r) =>
        `<option value="${r.id}">${r.name} (${r.capacity} places)</option>`,
    )
    .join("");
}

function formatDate(value) {
  return new Date(value.replace(" ", "T")).toLocaleString("fr-FR");
}

function render(bookings) {
  document.getElementById("bookings").innerHTML = bookings
    .map(
      (b) => `
      <div class="booking">
        <div><b>${b.room}</b> — ${b.title}</div>
        <div class="when">${formatDate(b.start_at)} → ${formatDate(b.end_at)}</div>
      </div>`,
    )
    .join("");
}

async function loadBookings() {
  const res = await fetch("/api/bookings");
  render(await res.json());
}

async function search() {
  const q = document.getElementById("q").value;
  const res = await fetch("/api/bookings/search?q=" + q);
  render(await res.json());
}

async function book() {
  const body = {
    roomId: document.getElementById("room").value,
    title: document.getElementById("title").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
  };
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  document.getElementById("message").innerHTML = res.ok
    ? "Réservation enregistrée"
    : data.error;
  loadBookings();
}

document.querySelector(".btn").addEventListener("click", book);
document.getElementById("q").addEventListener("keyup", search);

loadRooms();
loadBookings();
