---
title: Linter et formater le code automatiquement
labels: git
---

**Critères d'acceptation**

- [ ] ESLint (configuration `eslint.config.mjs`) et Prettier sont configurés ; scripts `npm run lint` et `npm run format`
- [ ] `npm run lint` passe sur tout le projet
- [ ] hook `pre-commit` avec lint-staged : seuls les fichiers indexés sont lintés et formatés
