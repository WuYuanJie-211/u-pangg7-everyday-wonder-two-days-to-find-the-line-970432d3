import fs from "node:fs";

const line = "On the morning bus the reader beeped green before I had decided where I was going, and for one stop the city trusted me more than I trusted myself.";

// Gate: exactly one sentence — one terminal period only, no ! or ?, no internal ". ".
if (!(line.endsWith(".") && !line.slice(0, -1).includes(".") && !/[!?]/.test(line))) {
  throw new Error("gate failed: entry must be exactly one sentence");
}
// Gate: under 200 characters.
if (!(line.length < 200)) {
  throw new Error("gate failed: entry must be under 200 characters");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", line + "\n", "utf8");
fs.chmodSync("/output/entry.txt", 0o644);
const mode = fs.statSync("/output/entry.txt").mode & 0o777;
if (mode !== 0o644) {
  throw new Error("gate failed: entry.txt mode is not 0644");
}
// Read-back check: what landed on disk must be byte-identical to the line plus newline.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== line + "\n") {
  throw new Error("gate failed: entry.txt content does not match the line");
}
console.log(line);
