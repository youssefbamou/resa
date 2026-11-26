CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  capacity INTEGER NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES rooms(id),
  title TEXT NOT NULL,
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NOT NULL,
  CHECK (end_at > start_at)
);

INSERT INTO rooms (name, capacity) VALUES
  ('F204', 30),
  ('F205', 30),
  ('F301', 20),
  ('Amphi', 120);

INSERT INTO bookings (room_id, title, start_at, end_at) VALUES
  (2, 'B3 DEV — Environnement de développement', '2026-11-26 11:00', '2026-11-26 13:00'),
  (2, 'B3 DEV — Environnement de développement', '2026-11-26 14:00', '2026-11-26 17:00'),
  (2, 'B3 DEV — Environnement de développement', '2026-12-14 10:00', '2026-12-14 13:00'),
  (1, 'B3 DEV — Sécurité applicative', '2026-11-25 09:00', '2026-11-25 13:00');
