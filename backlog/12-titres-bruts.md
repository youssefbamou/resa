---
title: Audit de sécurité — titres de réservation affichés tels quels
labels: securite
---

Une réservation dont le titre contient du HTML… exécute ce HTML chez tous les visiteurs.

**Critères d'acceptation**

- [ ] la faille est démontrée
- [ ] plus aucun `innerHTML` alimenté par des données utilisateur côté front
- [ ] une réservation intitulée `<img src=x onerror=alert(1)>` s'affiche comme du texte
