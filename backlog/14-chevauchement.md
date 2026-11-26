---
title: On peut réserver une salle déjà occupée
labels: ui-metier, bug
---

J'ai réservé F205 le 26/11 de 10h30 à 13h30 alors que le cours B3 DEV y a lieu de 11h à 13h. L'application a accepté.

**Critères d'acceptation**

- [ ] tests unitaires (Jest) des règles de `bookings.service` : horaires 8h–18h, durée 4h maximum, chevauchements (dont ce cas)
- [ ] le bug est corrigé et `npm test` passe
