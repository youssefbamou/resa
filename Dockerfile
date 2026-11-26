# Image officielle et légère, même version majeure que .nvmrc
FROM node:26-alpine

ENV NODE_ENV=production
WORKDIR /app

# D'abord les dépendances : cache des couches
COPY package.json package-lock.json ./
# Dépendances de production uniquement, exactement celles du lockfile
RUN npm ci --omit=dev && npm cache clean --force

# Puis le code
COPY src/ ./src/
COPY public/ ./public/

# Pas de root : l'image officielle fournit l'utilisateur "node"
USER node

EXPOSE 3000
CMD ["node", "src/server.js"]
