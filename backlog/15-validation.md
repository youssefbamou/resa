---
title: Erreur 500 quand la date de fin est avant la date de début
labels: ui-metier, bug
---

**Critères d'acceptation**

- [ ] les entrées de `POST /api/bookings` sont validées : salle existante, titre non vide, dates valides, fin après début
- [ ] une entrée invalide renvoie 400 avec un message compréhensible
- [ ] codes HTTP justes : 201 création, 400 entrée invalide, 409 conflit de créneau
