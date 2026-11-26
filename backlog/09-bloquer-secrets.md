---
title: Empêcher de commiter un secret
labels: git, securite
---

**Critères d'acceptation**

- [ ] secretlint configuré (`.secretlintrc.json`, preset recommandé)
- [ ] exécuté sur les fichiers indexés au `pre-commit`
- [ ] un fichier contenant une chaîne de connexion PostgreSQL avec mot de passe est refusé
