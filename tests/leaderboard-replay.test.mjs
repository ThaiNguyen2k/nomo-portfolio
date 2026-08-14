import assert from "node:assert/strict";
import test from "node:test";
import { verifyReplay } from "../leaderboard-worker/src/index.js";

test("rejects impossible direction reversals", () => {
  assert.equal(verifyReplay(1, "R", "RL"), null);
});

test("accepts a deterministic game-over replay", () => {
  const result = verifyReplay(1, "R", "RRRRRRR");
  assert.ok(result);
  assert.equal(result.score, 0);
  assert.equal(result.expectedDuration, 7 * 340);
});

test("rejects unfinished and malformed replays", () => {
  assert.equal(verifyReplay(1, "R", "R"), null);
  assert.equal(verifyReplay(1, "R", "RX"), null);
  assert.equal(verifyReplay(1, "X", "RRRRRRR"), null);
  assert.equal(verifyReplay(1, "R", "RRRRRRRR"), null);
});
