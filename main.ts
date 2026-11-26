import { chmodSync, mkdirSync, statSync, writeFileSync } from "node:fs";

const LINE =
  "I tapped my bus card and the reader beeped green before I knew where I was going, and for one stop the city trusted me more than I trusted myself.";

if (!LINE.endsWith(".") || (LINE.match(/\./g) ?? []).length !== 1) {
  throw new Error("gate: exactly one sentence with one terminal period");
}
if (LINE.includes("!") || LINE.includes("?") || LINE.includes(". ")) {
  throw new Error("gate: no exclamation, question mark, or internal period");
}
if (LINE.length >= 200) {
  throw new Error("gate: line must be under 200 characters");
}
if (LINE.length < 100 || LINE.includes("\n") || LINE.includes("\r") || LINE.trim() !== LINE) {
  throw new Error("gate: line must be a single unpadded line of at least 100 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", { mode: 0o644 });
chmodSync("/output/entry.txt", 0o644);
const mode = statSync("/output/entry.txt").mode & 0o777;
if (mode !== 0o644) {
  throw new Error(`gate: entry.txt mode is ${mode.toString(8)}, expected 644`);
}
