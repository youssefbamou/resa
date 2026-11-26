---
title: Conteneuriser l'application et sa base de données
labels: env
---

Installer PostgreSQL à la main sur chaque poste n'est pas reproductible.

**Critères d'acceptation**

- [ ] `docker-compose.yml` : un service `db` (PostgreSQL 17, initialisé avec `db/init.sql`, données dans un volume nommé) et un service `app`
- [ ] `Dockerfile` pour l'application : image officielle, dépendances de production uniquement, utilisateur non-root
- [ ] `.dockerignore` (au minimum `node_modules`, `.env`, `.git`)
- [ ] `docker compose up --build` → http://localhost:3000 affiche les salles
