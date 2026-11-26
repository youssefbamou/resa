---
title: Fixer la version de Node.js du projet
labels: env
---

Personne n'a la même version de Node. `npm run doctor` le signale.

**Critères d'acceptation**

- [ ] `.nvmrc` à la racine (version LTS actuelle)
- [ ] champ `engines` dans `package.json`
- [ ] `npm run doctor` : la ligne Node est ✅ après `nvm use`
