#!/usr/bin/env node
// Reviews every email in a campaign folder against our brand and email rules,
// using Claude Code headless (no one needs to type anything).
//
// Usage:   node scripts/review.mjs campaigns/<campaign-folder>
// Output:  review/findings.json, plus a one-line summary.
// Exit:    0 = no high-severity findings, 1 = at least one high finding,
//          2 = the review itself failed (bad input or no usable result).
//
// Set CLAUDE_BIN if the `claude` command is not on your PATH.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function fail(message) {
  console.error(`review: ${message}`);
  process.exit(2);
}

const folder = process.argv[2];
if (!folder) fail("give a campaign folder, for example: node scripts/review.mjs campaigns/steep-club-launch");
const folderPath = resolve(root, folder);
if (!existsSync(folderPath) || !statSync(folderPath).isDirectory()) fail(`folder not found: ${folder}`);

const schema = readFileSync(join(root, "review/findings.schema.json"), "utf8");
const findingsPath = join(root, "review/findings.json");
// Store the folder the same way every time, so "campaigns/x/" and "./campaigns/x" match.
const folderKey = relative(root, folderPath).split(sep).join("/");

let prompt =
  `Review every email in ${folderKey} against brand/voice.md and .claude/rules/emails.md. ` +
  `Report only real problems.`;

// If the last review was for this same folder, pass its findings along so
// this review reports only what is new or still not fixed.
let earlier = null;
if (existsSync(findingsPath)) {
  try {
    const saved = JSON.parse(readFileSync(findingsPath, "utf8"));
    if (saved.folder === folderKey && Array.isArray(saved.findings)) earlier = saved.findings;
  } catch {
    // An unreadable old file is treated as no earlier review.
  }
}
if (earlier) {
  prompt +=
    `\n\nThese are findings from the last review. Report only problems that are new or still not fixed. ` +
    `Don't repeat ones that have been fixed.\n\n${JSON.stringify(earlier, null, 2)}`;
}

const result = spawnSync(
  process.env.CLAUDE_BIN || "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schema,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (result.error) fail(`could not run claude: ${result.error.message}`);

let output;
try {
  output = JSON.parse(result.stdout);
} catch {
  fail(`claude did not return JSON (exit ${result.status}).\n${result.stderr || result.stdout}`);
}

// The output is either one result object, or a list whose last item is the result.
const final = Array.isArray(output) ? output.at(-1) : output;
if (final?.is_error) fail(`claude reported an error: ${final.result ?? final.subtype ?? "unknown"}`);
const structured = final?.structured_output;
if (!structured || !Array.isArray(structured.findings)) {
  fail(`no structured_output with a findings list in the result (exit ${result.status}).`);
}

mkdirSync(join(root, "review"), { recursive: true });
writeFileSync(findingsPath, JSON.stringify({ folder: folderKey, findings: structured.findings }, null, 2) + "\n");

const count = (level) => structured.findings.filter((f) => f.severity === level).length;
const high = count("high");
console.log(
  `${folderKey}: ${structured.findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low)` +
    `${earlier ? `, compared with ${earlier.length} from the last review` : ""}. Saved to review/findings.json.`,
);

process.exit(high > 0 ? 1 : 0);
