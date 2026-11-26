---
title: Le fichier .env contient un mot de passe et il est versionné
labels: env, securite
---

`.env` est dans le dépôt, avec le mot de passe de la base. `src/db.js` contient aussi le même mot de passe « au cas où ».

**Critères d'acceptation**

- [ ] `.env` n'est plus suivi par Git et il est ignoré (`.gitignore`)
- [ ] `.env.example` est versionné, sans aucun secret réel
- [ ] plus aucun mot de passe dans le code (`src/`)
- [ ] l'application refuse de démarrer, avec un message clair, si une variable manque
- [ ] le mot de passe exposé n'est plus utilisé nulle part (rotation)
