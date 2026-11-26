# Résa

Application de réservation des salles du campus (F204, F205…, de 8h à 18h).

Stack : **Express** (Node.js) + **PostgreSQL** + HTML/CSS/JS, le tout lancé avec **Docker Compose**.

## Prérequis

| Outil | Version | Remarque |
|---|---|---|
| Git | 2.x | |
| Docker + Docker Compose v2 | Docker 24 ou plus | Windows : Docker Desktop **avec WSL 2** (Ubuntu) |
| Node.js | 26 (voir `.nvmrc`) | Seulement pour développer hors Docker |

Pas de Docker ou pas de droits admin ? Utilisez **GitHub Codespaces** : sur GitHub, *Code → Codespaces → Create codespace on main*. Docker, Node et Git y sont déjà installés.

## Démarrer en 3 commandes

```bash
git clone https://github.com/youssefbamou/resa.git && cd resa
cp .env.example .env
docker compose up --build
```

Puis ouvrir **http://localhost:3000** (dans Codespaces : onglet *Ports*, port 3000).

## Développer

```bash
docker compose logs -f     # suivre les logs
docker compose down        # arrêter
docker compose down -v     # arrêter + effacer la base (elle sera recréée depuis db/init.sql)
npm run doctor             # vérifier son poste (Node, Docker, .env…)
```

Lancer l'application hors Docker (la base reste dans Docker) :

```bash
nvm use                    # lit .nvmrc (Windows / nvm-windows : nvm install 26 && nvm use 26)
npm ci
docker compose up -d db
npm run dev
```

### Variables d'environnement

Toutes sont listées dans `.env.example` (versionné, sans secret). Le fichier `.env` est local et **jamais versionné**.

| Variable | Rôle |
|---|---|
| `PORT` | Port de l'application sur votre machine (3000 par défaut) |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Compte et base PostgreSQL |
| `PGPORT` | Port de la base sur votre machine (5433, sur 127.0.0.1 uniquement) |
| `DATABASE_URL` | Connexion à la base, utilisée hors Docker seulement |

L'application refuse de démarrer, avec un message clair, si une variable obligatoire manque.

## Dépannage

| Symptôme | Solution |
|---|---|
| `POSTGRES_PASSWORD manquante` | `cp .env.example .env` |
| `port is already allocated` (3000 ou 5433) | Changer `PORT` ou `PGPORT` dans `.env` |
| `Cannot connect to the Docker daemon` | Lancer Docker Desktop (Linux : `sudo systemctl start docker`) |
| Modif de `db/init.sql` ou du mot de passe sans effet | La base garde ses anciennes données : `docker compose down -v` puis `docker compose up --build` |
| Windows : erreurs de fins de ligne ou lenteurs | Travailler dans WSL 2 (Ubuntu), pas dans PowerShell, et cloner dans `~` plutôt que dans `/mnt/c` |
| Mot de passe avec `@`, `:` ou `/` | Éviter ces caractères : ils cassent l'URL de connexion |

## Conventions de l'équipe

- Une branche par sujet (`feat/…`, `fix/…`, `chore/…`, `docs/…`), fusionnée dans `main` par **Pull Request relue**
- Commits conventionnels : `feat:`, `fix:`, `docs:`, `chore:`…
- Fichiers en `kebab-case` ou `nom.role.js`, variables JS en `camelCase`, colonnes SQL en `snake_case`
- Aucun secret dans le dépôt : un secret exposé est **changé**, pas caché
