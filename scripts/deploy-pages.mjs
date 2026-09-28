// Builds the static site and publishes it to the gh-pages branch of origin.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: "inherit", ...opts });
const read = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8" }).trim();

const remote = read("git", ["remote", "get-url", "origin"]);
const repo = path.basename(remote).replace(/\.git$/, "");
run("npm", ["run", "build:pages"], { env: { ...process.env, PAGES_BASE: `/${repo}/` } });

const out = path.resolve("dist-pages");
writeFileSync(path.join(out, ".nojekyll"), "");
const gitDir = mkdtempSync(path.join(tmpdir(), "gh-pages-"));
const git = (...args) => run("git", [`--git-dir=${gitDir}`, `--work-tree=${out}`, ...args]);
try {
  git("init", "-q", "-b", "gh-pages");
  git("add", "-A");
  git("-c", `user.name=${read("git", ["config", "user.name"]) || "deploy"}`, "-c", `user.email=${read("git", ["config", "user.email"]) || "deploy@localhost"}`, "commit", "-q", "-m", `Deploy ${read("git", ["rev-parse", "--short", "HEAD"])}`);
  git("push", "-f", remote, "gh-pages");
} finally {
  rmSync(gitDir, { recursive: true, force: true });
}
