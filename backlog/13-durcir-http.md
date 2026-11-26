---
title: Durcir les en-têtes HTTP et la gestion des erreurs
labels: securite
---

**Critères d'acceptation**

- [ ] en-têtes de sécurité (helmet), dont une Content-Security-Policy, et le front fonctionne toujours
- [ ] CORS limité à l'origine de l'application
- [ ] une erreur 500 ne renvoie jamais la pile d'appels au client
- [ ] l'en-tête `X-Powered-By` n'est plus envoyé
