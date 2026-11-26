---
title: Normaliser les messages de commit
labels: git
---

L'historique ressemble à « first commit », « fix », « wip ». Impossible d'écrire un CHANGELOG.

**Critères d'acceptation**

- [ ] la convention Conventional Commits est documentée dans le README (section « Contribuer »)
- [ ] Husky est installé : `npm install` active les hooks
- [ ] hook `commit-msg` avec commitlint : `git commit -m "update"` est refusé
