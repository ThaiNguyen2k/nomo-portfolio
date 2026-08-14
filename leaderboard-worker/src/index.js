const allowedOrigins = new Set([
  "https://thainguyen2k.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://thainguyen2k.github.io",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(request) });
}

function isAllowedRequest(request) {
  const origin = request.headers.get("Origin");
  return origin === null || allowedOrigins.has(origin);
}

async function readBody(request) {
  const contentLength = Number(request.headers.get("Content-Length") ?? 0);
  if (contentLength > 2048) throw new Error("payload-too-large");
  return request.json();
}

function cleanName(value) {
  if (typeof value !== "string") return null;
  const name = value.normalize("NFKC").trim().replace(/\s+/g, " ");
  const characters = Array.from(name);
  if (characters.length < 2 || characters.length > 20) return null;
  if (!/^[\p{L}\p{N} ._-]+$/u.test(name)) return null;
  return name;
}

async function topScores(env) {
  const result = await env.DB.prepare(
    `SELECT name, score, created_at
     FROM leaderboard_entries
     ORDER BY score DESC, created_at ASC
     LIMIT 10`,
  ).all();

  return result.results.map((entry, index) => ({
    rank: index + 1,
    name: entry.name,
    score: entry.score,
    createdAt: new Date(entry.created_at).toISOString(),
  }));
}

async function createSession(request, env) {
  const now = Date.now();
  const sessionId = crypto.randomUUID();
  const seed = crypto.getRandomValues(new Uint32Array(1))[0] || 1;
  await env.DB.batch([
    env.DB.prepare("DELETE FROM game_sessions WHERE created_at < ?").bind(now - 86_400_000),
    env.DB.prepare("INSERT INTO game_sessions (id, seed, created_at) VALUES (?, ?, ?)").bind(sessionId, seed, now),
  ]);
  return json(request, { sessionId, seed });
}

const rows = 10;
const columns = 12;
const totalCells = rows * columns;
const initialSpeed = 340;
const minimumSpeed = 180;
const pointsPerSpeedLevel = 5;
const speedStep = 18;
const directions = { U: -columns, R: 1, D: columns, L: -1 };

export function speedForScore(score) {
  const speedLevel = Math.floor(score / pointsPerSpeedLevel);
  return Math.max(minimumSpeed, initialSpeed - speedLevel * speedStep);
}

function startingSnake(direction) {
  const head = 65;
  if (direction === 1) return [head, head - 1, head - 2];
  if (direction === -1) return [head, head + 1, head + 2];
  if (direction === columns) return [head, head - columns, head - columns * 2];
  return [head, head + columns, head + columns * 2];
}

function nextRandom(seed) {
  let value = seed >>> 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  return value >>> 0 || 1;
}

function randomFood(snake, seed) {
  const nextSeed = nextRandom(seed);
  const available = Array.from({ length: totalCells }, (_, index) => index).filter((index) => !snake.includes(index));
  return { food: available[nextSeed % available.length] ?? -1, seed: nextSeed };
}

export function verifyReplay(seed, startKey, replay) {
  if (!(startKey in directions) || typeof replay !== "string" || replay.length > 5000 || !/^[URDL]+$/.test(replay)) return null;

  let direction = directions[startKey];
  let snake = startingSnake(direction);
  let randomState = seed;
  let foodState = randomFood(snake, randomState);
  let food = foodState.food;
  randomState = foodState.seed;
  let score = 0;
  let expectedDuration = 0;
  let gameOver = false;

  for (let moveIndex = 0; moveIndex < replay.length; moveIndex += 1) {
    const key = replay[moveIndex];
    const nextDirection = directions[key];
    if (nextDirection + direction === 0) return null;
    direction = nextDirection;
    expectedDuration += speedForScore(score);

    const head = snake[0];
    const headRow = Math.floor(head / columns);
    const headColumn = head % columns;
    const nextRow = headRow + (direction === columns ? 1 : direction === -columns ? -1 : 0);
    const nextColumn = headColumn + (direction === 1 ? 1 : direction === -1 ? -1 : 0);
    if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns) {
      if (moveIndex !== replay.length - 1) return null;
      gameOver = true;
      break;
    }

    const nextHead = nextRow * columns + nextColumn;
    const ateFood = nextHead === food;
    const collisionBody = ateFood ? snake : snake.slice(0, -1);
    if (collisionBody.includes(nextHead)) {
      if (moveIndex !== replay.length - 1) return null;
      gameOver = true;
      break;
    }

    snake = ateFood ? [nextHead, ...snake] : [nextHead, ...snake.slice(0, -1)];
    if (ateFood) {
      score += 1;
      foodState = randomFood(snake, randomState);
      food = foodState.food;
      randomState = foodState.seed;
    }
  }

  return gameOver ? { score, expectedDuration } : null;
}

async function submitScore(request, env) {
  let body;
  try {
    body = await readBody(request);
  } catch {
    return json(request, { error: "Invalid request." }, 400);
  }

  const name = cleanName(body.name);
  const score = Number(body.score);
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const replay = typeof body.replay === "string" ? body.replay : "";
  const startDirection = typeof body.startDirection === "string" ? body.startDirection : "";
  if (!name) return json(request, { error: "Name must contain 2–20 letters or numbers." }, 400);
  if (!Number.isInteger(score) || score < 1 || score > 117) return json(request, { error: "Invalid score." }, 400);
  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return json(request, { error: "Invalid game session." }, 400);

  const session = await env.DB.prepare(
    "SELECT seed, created_at, submitted_at FROM game_sessions WHERE id = ?",
  ).bind(sessionId).first();
  if (!session || session.submitted_at !== null) return json(request, { error: "This run is no longer valid." }, 409);

  const verified = verifyReplay(session.seed, startDirection, replay);
  if (!verified || verified.score !== score) return json(request, { error: "This score could not be verified." }, 400);

  const now = Date.now();
  const elapsed = now - session.created_at;
  if (elapsed < verified.expectedDuration * 0.85 || elapsed > 7_200_000) return json(request, { error: "Score timing is invalid." }, 400);

  const claimed = await env.DB.prepare(
    "UPDATE game_sessions SET submitted_at = ? WHERE id = ? AND submitted_at IS NULL",
  ).bind(now, sessionId).run();
  if (claimed.meta.changes !== 1) return json(request, { error: "This run was already submitted." }, 409);

  const normalizedName = name.toLocaleLowerCase("vi");
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO leaderboard_entries (name, normalized_name, score, created_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(normalized_name) DO UPDATE SET
         name = excluded.name,
         score = excluded.score,
         created_at = excluded.created_at
       WHERE excluded.score > leaderboard_entries.score`,
    ).bind(name, normalizedName, score, now),
    env.DB.prepare(
      `DELETE FROM leaderboard_entries
       WHERE id NOT IN (
         SELECT id FROM leaderboard_entries
         ORDER BY score DESC, created_at ASC
         LIMIT 10
       )`,
    ),
  ]);

  return json(request, { scores: await topScores(env) }, 201);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request) });
    if (!isAllowedRequest(request)) return json(request, { error: "Origin not allowed." }, 403);

    if (request.method === "GET" && url.pathname === "/leaderboard") {
      return json(request, { scores: await topScores(env) });
    }
    if (request.method === "POST" && url.pathname === "/session") return createSession(request, env);
    if (request.method === "POST" && url.pathname === "/leaderboard") return submitScore(request, env);
    if (request.method === "GET" && url.pathname === "/health") return json(request, { ok: true });
    return json(request, { error: "Not found." }, 404);
  },
};
