---
title: Audit de sécurité — la recherche de réservations
labels: securite
---

Un audit externe signale que la route `GET /api/bookings/search?q=` « exécute des requêtes construites à partir de la saisie utilisateur ».

**Critères d'acceptation**

- [ ] la faille est démontrée (payload dans la description de la PR)
- [ ] requête paramétrée : plus aucune saisie concaténée dans du SQL
- [ ] le payload de démonstration ne renvoie plus rien d'anormal
