#!/usr/bin/env node
// Copies package.json's version into both plugin manifests.
// Runs as part of `npm run version`, immediately after `changeset version`.
// With --check it also verifies both manifests ship exactly the promoted skills.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const pluginPaths = [
  join(repo, ".claude-plugin", "plugin.json"),
  join(repo, ".codex-plugin", "plugin.json"),
];

const { version } = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const check = process.argv.includes("--check");
let failed = false;

const promotedSkills = ["engineering", "productivity"]
  .flatMap((bucket) =>
    readdirSync(join(repo, "skills", bucket), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => `./skills/${bucket}/${entry.name}`),
  )
  .sort();

for (const pluginPath of pluginPaths) {
  const source = readFileSync(pluginPath, "utf8");
  const plugin = JSON.parse(source);

  if (plugin.version !== version) {
    if (check) {
      console.error(`${pluginPath}: version ${plugin.version}, expected ${version}`);
      failed = true;
    } else {
      const updated = source.replace(
        /("version"\s*:\s*")[^"]*(")/,
        `$1${version}$2`,
      );
      writeFileSync(pluginPath, updated);
      console.log(`${pluginPath}: ${plugin.version} -> ${version}`);
    }
  }

  if (check) {
    const declaredSkills = [...(plugin.skills ?? [])].sort();
    if (JSON.stringify(declaredSkills) !== JSON.stringify(promotedSkills)) {
      console.error(`${pluginPath}: skills do not match the promoted catalog`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
if (check) console.log(`${pluginPaths.length} plugin manifests are in sync`);
