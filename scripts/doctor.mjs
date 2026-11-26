import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const results = [];

function run(command) {
  try {
    return execSync(command, {
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 15000,
    })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function check(label, ok, hint) {
  results.push({ label, ok, hint });
}

const nodeVersion = process.versions.node;
if (existsSync(".nvmrc")) {
  const wanted = readFileSync(".nvmrc", "utf8").trim().replace(/^v/, "");
  const ok = nodeVersion.split(".")[0] === wanted.split(".")[0];
  check(
    `Node ${nodeVersion} (le projet demande ${wanted})`,
    ok,
    `nvm install && nvm use  —  Windows (nvm-windows) : nvm install ${wanted} && nvm use ${wanted}`,
  );
} else {
  check(`Node ${nodeVersion}`, true);
  check(".nvmrc présent", false, "le projet n'impose aucune version de Node");
}
check("npm", run("npm --version") !== null, "npm est livré avec Node.js");
check("git", run("git --version") !== null, "https://git-scm.com/downloads");
check(
  "docker",
  run("docker --version") !== null,
  "Docker Desktop (Windows/macOS) ou Docker Engine (Linux) — sinon Plan B : Codespaces",
);
check(
  "docker compose",
  run("docker compose version") !== null,
  "Docker Compose v2 est inclus dans Docker Desktop",
);
check(
  "démon Docker démarré",
  run("docker info") !== null,
  "lancer Docker Desktop — Linux : sudo systemctl start docker, et sudo usermod -aG docker $USER puis se reconnecter",
);
check(
  ".env non versionné",
  run("git rev-parse --is-inside-work-tree") === "true" &&
    !run("git ls-files .env"),
  "git rm --cached .env (et l'ajouter au .gitignore)",
);

for (const { label, ok, hint } of results) {
  console.log(`${ok ? "✅" : "❌"} ${label}`);
  if (!ok && hint) console.log(`   → ${hint}`);
}
process.exitCode = results.every((r) => r.ok) ? 0 : 1;
