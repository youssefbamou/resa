---
title: Audit de sécurité — dépendances vulnérables
labels: securite
---

**Critères d'acceptation**

- [ ] `npm audit` : aucune vulnérabilité de niveau high ou critical
- [ ] la vulnérabilité la plus grave est expliquée dans la PR (composant, impact, score CVSS)
- [ ] hook `pre-push` : `npm audit --audit-level=high`
