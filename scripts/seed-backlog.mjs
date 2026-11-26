import { readdirSync, readFileSync } from "node:fs";

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
if (!repo || !token) {
  console.error(
    'GITHUB_REPOSITORY et GITHUB_TOKEN sont requis (lancer via le workflow "Seed backlog")',
  );
  process.exit(1);
}

const LABELS = [
  {
    name: "env",
    color: "0e8a16",
    description: "Partie I — Environnement de développement",
  },
  {
    name: "git",
    color: "1d76db",
    description: "Partie II — Git et travail collaboratif",
  },
  {
    name: "securite",
    color: "b60205",
    description: "Partie III — Sécurité applicative",
  },
  {
    name: "ui-metier",
    color: "fbca04",
    description: "Partie IV — Interface et composants métier",
  },
  {
    name: "bug",
    color: "d73a4a",
    description: "Défaut",
  },
  {
    name: "agile",
    color: "5319e7",
    description: "Partie V — Gestion de projet",
  },
];

function api(path, options = {}) {
  return fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
  });
}

function parse(file) {
  const text = readFileSync(`backlog/${file}`, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${file} : en-tête --- manquant`);
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return {
    title: meta.title,
    labels: meta.labels.split(",").map((label) => label.trim()),
    body: match[2].trim(),
  };
}

for (const label of LABELS) {
  const res = await api("/labels", {
    method: "POST",
    body: JSON.stringify(label),
  });
  if (!res.ok && res.status !== 422)
    throw new Error(`label ${label.name} : ${res.status} ${await res.text()}`);
}

const existing = new Set();
for (let page = 1; ; page += 1) {
  const res = await api(`/issues?state=all&per_page=100&page=${page}`);
  if (!res.ok) throw new Error(`issues : ${res.status} ${await res.text()}`);
  const items = await res.json();
  if (items.length === 0) break;
  for (const item of items) existing.add(item.title);
}

for (const file of readdirSync("backlog")
  .filter((f) => f.endsWith(".md"))
  .sort()) {
  const issue = parse(file);
  if (existing.has(issue.title)) {
    console.log(`= ${issue.title}`);
    continue;
  }
  const res = await api("/issues", {
    method: "POST",
    body: JSON.stringify(issue),
  });
  if (!res.ok) throw new Error(`${file} : ${res.status} ${await res.text()}`);
  console.log(`+ #${(await res.json()).number} ${issue.title}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
}
