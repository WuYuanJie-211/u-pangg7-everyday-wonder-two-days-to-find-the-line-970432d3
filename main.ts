import { mkdirSync, writeFileSync } from "node:fs";

// One original sentence: a small everyday moment made strange.
// Fresh angle: the escalator handrail outrunning the steps beneath it.
const SENTENCE =
  "The escalator handrail moved a fraction faster than the steps, so for one whole floor my hand arrived before the rest of me did.";

mkdirSync("/output", { recursive: true });

// Validation gate: the competition requires exactly one sentence of
// 1-200 characters on a single line. Refuse loudly instead of writing
// an invalid entry.
const trimmed = SENTENCE.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  console.error(`INVALID: sentence is ${trimmed.length} chars, must be 1-200.`);
  process.exit(1);
}
if (trimmed.includes("\n") || trimmed.includes("\r")) {
  console.error("INVALID: sentence must be a single line.");
  process.exit(1);
}
if (!trimmed.endsWith(".")) {
  console.error("INVALID: sentence must end with a full stop.");
  process.exit(1);
}

writeFileSync("/output/entry.txt", SENTENCE + "\n", "utf8");
console.log(`Wrote ${SENTENCE.length} characters to /output/entry.txt`);
