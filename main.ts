import { mkdirSync, writeFileSync } from "node:fs";

// One original sentence: a small everyday moment made strange.
// Fresh angle: the bus card reader beeps green before the journey is
// even decided, so the city briefly trusts the rider more than the
// rider trusts themselves. (Round 2 rewrite: the round-1 escalator
// handrail angle is now shared by ~25 entries in the field, so this
// entry moves to an angle no other submission uses.)
const SENTENCE =
  "I tap my card on the bus and it beeps green before I have decided where I am going, and for one stop the city trusts me more than I trust myself.";

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
// Round 2 revision: exactly ONE sentence. The old gate accepted any
// text ending in a period, including two sentences joined by ". ".
// A multi-sentence entry fails the competition's one-sentence rule,
// so reject it here: no '!' or '?', no internal period followed by a
// space, and exactly one terminal period in total.
if (trimmed.includes("!") || trimmed.includes("?")) {
  console.error("INVALID: sentence must not contain '!' or '?'.");
  process.exit(1);
}
if (/\. /.test(trimmed)) {
  console.error("INVALID: entry contains more than one sentence.");
  process.exit(1);
}
const periods = (trimmed.match(/\./g) || []).length;
if (periods !== 1) {
  console.error(`INVALID: entry has ${periods} periods, must have exactly 1.`);
  process.exit(1);
}

writeFileSync("/output/entry.txt", SENTENCE + "\n", "utf8");
console.log(`Wrote ${SENTENCE.length} characters to /output/entry.txt`);
