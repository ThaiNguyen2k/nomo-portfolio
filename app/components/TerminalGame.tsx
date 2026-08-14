"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

const rows = 10;
const columns = 12;
const totalCells = rows * columns;
const initialSpeed = 340;
const minimumSpeed = 180;
const pointsPerSpeedLevel = 5;
const speedStep = 18;
const leaderboardApi = "https://nomo-snake-leaderboard.nguyendragon2000.workers.dev";
const defaultDirection: Direction = 1;

type Direction = -12 | -1 | 1 | 12;
type Phase = "ready" | "countdown" | "running" | "game-over";
type GameState = { phase: Phase; snake: number[]; food: number; score: number; countdown: number; randomSeed: number };
type GameSession = { sessionId: string; seed: number };
type LeaderboardEntry = { rank: number; name: string; score: number; createdAt: string };
type LeaderboardView = "closed" | "list" | "name";
type LeaderboardStatus = "idle" | "loading" | "saving" | "error";

function startingSnake(nextDirection: Direction) {
  const head = 65;
  if (nextDirection === 1) return [head, head - 1, head - 2];
  if (nextDirection === -1) return [head, head + 1, head + 2];
  if (nextDirection === columns) return [head, head - columns, head - columns * 2];
  return [head, head + columns, head + columns * 2];
}

function nextRandom(seed: number) {
  let value = seed >>> 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  return value >>> 0 || 1;
}

function randomFood(snake: number[], seed: number) {
  const nextSeed = nextRandom(seed);
  const availableCells = Array.from({ length: totalCells }, (_, index) => index).filter((index) => !snake.includes(index));
  return { food: availableCells[nextSeed % availableCells.length] ?? -1, seed: nextSeed };
}

function directionKey(nextDirection: Direction) {
  if (nextDirection === -columns) return "U";
  if (nextDirection === columns) return "D";
  if (nextDirection === -1) return "L";
  return "R";
}

function localSeed() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] || 1;
}

const initialSnake = startingSnake(defaultDirection);
const initialGame: GameState = { phase: "ready", snake: initialSnake, food: 34, score: 0, countdown: 0, randomSeed: 1 };

export default function TerminalGame() {
  const [game, setGame] = useState<GameState>(initialGame);
  const [isStarting, setIsStarting] = useState(false);
  const [leaderboardView, setLeaderboardView] = useState<LeaderboardView>("closed");
  const [leaderboardStatus, setLeaderboardStatus] = useState<LeaderboardStatus>("idle");
  const [leaderboardMessage, setLeaderboardMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState("");
  const direction = useRef<Direction>(defaultDirection);
  const directionQueue = useRef<Direction[]>([]);
  const activeSession = useRef<GameSession | null>(null);
  const runSeed = useRef(1);
  const runStartDirection = useRef<Direction>(defaultDirection);
  const replay = useRef("");
  const starting = useRef(false);
  const speedLevel = Math.floor(game.score / pointsPerSpeedLevel);
  const speed = Math.max(minimumSpeed, initialSpeed - speedLevel * speedStep);

  const requestSession = useCallback(async () => {
    const response = await fetch(`${leaderboardApi}/session`, { method: "POST" });
    if (!response.ok) throw new Error("Leaderboard service is unavailable.");
    const session = await response.json() as GameSession;
    if (!session.sessionId || !Number.isInteger(session.seed)) throw new Error("Invalid leaderboard session.");
    return session;
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    const response = await fetch(`${leaderboardApi}/leaderboard`, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load the leaderboard.");
    const data = await response.json() as { scores: LeaderboardEntry[] };
    setLeaderboard(data.scores);
    return data.scores;
  }, []);

  const resetGame = useCallback((nextDirection: Direction, phase: Phase, seed: number) => {
    const snake = startingSnake(nextDirection);
    const nextFood = randomFood(snake, seed);
    direction.current = nextDirection;
    directionQueue.current = [];
    runSeed.current = seed;
    runStartDirection.current = nextDirection;
    replay.current = "";
    setGame({ phase, snake, food: nextFood.food, score: 0, countdown: phase === "countdown" ? 3 : 0, randomSeed: nextFood.seed });
  }, []);

  const beginGame = useCallback(async (nextDirection: Direction, phase: Phase) => {
    if (starting.current) return;
    starting.current = true;
    setIsStarting(true);
    setLeaderboardView("closed");
    setLeaderboardMessage("");

    let session: GameSession | null = null;
    try {
      session = await requestSession();
    } catch {
      setLeaderboardMessage("This run is playable but cannot enter the online ranking.");
    }

    activeSession.current = session;
    resetGame(nextDirection, phase, session?.seed ?? localSeed());
    starting.current = false;
    setIsStarting(false);
  }, [requestSession, resetGame]);

  const startWithCountdown = useCallback(() => {
    void beginGame(defaultDirection, "countdown");
  }, [beginGame]);

  const turn = useCallback((nextDirection: Direction) => {
    const previousDirection = directionQueue.current.at(-1) ?? direction.current;
    if (nextDirection === previousDirection || nextDirection + previousDirection === 0) return;
    if (directionQueue.current.length < 2) directionQueue.current.push(nextDirection);
  }, []);

  const handleControl = useCallback((nextDirection: Direction) => {
    if (game.phase === "ready" || game.phase === "game-over") {
      void beginGame(nextDirection, "running");
      return;
    }

    if (game.phase === "countdown") {
      const snake = startingSnake(nextDirection);
      const nextFood = randomFood(snake, runSeed.current);
      direction.current = nextDirection;
      directionQueue.current = [];
      runStartDirection.current = nextDirection;
      replay.current = "";
      setGame((current) => ({ ...current, snake, food: nextFood.food, randomSeed: nextFood.seed }));
      return;
    }

    turn(nextDirection);
  }, [beginGame, game.phase, turn]);

  const openLeaderboard = useCallback(() => {
    setLeaderboardView("list");
    setLeaderboardStatus("loading");
    setLeaderboardMessage("");
    void fetchLeaderboard()
      .then(() => setLeaderboardStatus("idle"))
      .catch(() => {
        setLeaderboardStatus("error");
        setLeaderboardMessage("Could not load the online ranking. Please try again.");
      });
  }, [fetchLeaderboard]);

  const submitScore = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const session = activeSession.current;
    const name = playerName.trim();
    if (!session || name.length < 2) return;

    setLeaderboardStatus("saving");
    setLeaderboardMessage("");
    try {
      const response = await fetch(`${leaderboardApi}/leaderboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          score: game.score,
          sessionId: session.sessionId,
          startDirection: directionKey(runStartDirection.current),
          replay: replay.current,
        }),
      });
      const data = await response.json() as { scores?: LeaderboardEntry[]; error?: string };
      if (!response.ok || !data.scores) throw new Error(data.error ?? "Could not save this score.");
      activeSession.current = null;
      setLeaderboard(data.scores);
      setLeaderboardStatus("idle");
      setLeaderboardMessage("Verified score saved successfully.");
      setLeaderboardView("list");
      window.localStorage.setItem("nomo-snake-player", name);
    } catch (error) {
      setLeaderboardStatus("error");
      setLeaderboardMessage(error instanceof Error ? error.message : "Could not save this score.");
    }
  }, [game.score, playerName]);

  useEffect(() => {
    if (game.phase !== "countdown") return;
    const timer = window.setTimeout(() => {
      setGame((current) => current.countdown > 1
        ? { ...current, countdown: current.countdown - 1 }
        : { ...current, phase: "running", countdown: 0 });
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [game.countdown, game.phase]);

  useEffect(() => {
    if (game.phase !== "running" && game.phase !== "countdown") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyDirections: Record<string, Direction> = {
        ArrowUp: -columns, w: -columns, W: -columns,
        ArrowRight: 1, d: 1, D: 1,
        ArrowDown: columns, s: columns, S: columns,
        ArrowLeft: -1, a: -1, A: -1,
      };
      const nextDirection = keyDirections[event.key];
      if (!nextDirection) return;
      event.preventDefault();
      handleControl(nextDirection);
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [game.phase, handleControl]);

  useEffect(() => {
    if (game.phase !== "running") return;
    const timer = window.setInterval(() => {
      const nextDirection = directionQueue.current.shift() ?? direction.current;
      direction.current = nextDirection;
      replay.current += directionKey(nextDirection);

      setGame((current) => {
        if (current.phase !== "running") return current;
        const head = current.snake[0];
        const headRow = Math.floor(head / columns);
        const headColumn = head % columns;
        const nextRow = headRow + (nextDirection === columns ? 1 : nextDirection === -columns ? -1 : 0);
        const nextColumn = headColumn + (nextDirection === 1 ? 1 : nextDirection === -1 ? -1 : 0);
        if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns) return { ...current, phase: "game-over" };

        const nextHead = nextRow * columns + nextColumn;
        const ateFood = nextHead === current.food;
        const collisionBody = ateFood ? current.snake : current.snake.slice(0, -1);
        if (collisionBody.includes(nextHead)) return { ...current, phase: "game-over" };

        const snake = ateFood ? [nextHead, ...current.snake] : [nextHead, ...current.snake.slice(0, -1)];
        const nextFood = ateFood ? randomFood(snake, current.randomSeed) : null;
        return {
          ...current,
          snake,
          food: nextFood?.food ?? current.food,
          randomSeed: nextFood?.seed ?? current.randomSeed,
          score: current.score + (ateFood ? 1 : 0),
        };
      });
    }, speed);
    return () => window.clearInterval(timer);
  }, [game.phase, speed]);

  useEffect(() => {
    if (game.phase !== "game-over" || game.score < 1 || !activeSession.current) return;
    let cancelled = false;
    void fetchLeaderboard().then((scores) => {
      if (cancelled) return;
      const qualifies = scores.length < 10 || game.score > scores[scores.length - 1].score;
      if (!qualifies) return;
      setPlayerName(window.localStorage.getItem("nomo-snake-player") ?? "");
      setLeaderboardStatus("idle");
      setLeaderboardMessage("");
      setLeaderboardView("name");
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [fetchLeaderboard, game.phase, game.score]);

  return (
    <section className="section-shell terminal-game" aria-label="Interactive snake mini game">
      <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>nomo-lab.game</span><span className="window-status">server verified</span></div>
      <div className="game-body">
        <div className="game-board" style={{ "--game-columns": columns } as React.CSSProperties} aria-label="Snake game board">
          {Array.from({ length: totalCells }, (_, index) => {
            const snakeIndex = game.snake.indexOf(index);
            const snakeHue = 165 + (snakeIndex / Math.max(1, game.snake.length - 1)) * 105;
            const segmentStyle = snakeIndex >= 0 ? { "--snake-hue": snakeHue } as React.CSSProperties : undefined;
            return <i style={segmentStyle} className={`${snakeIndex >= 0 ? "snake" : ""} ${snakeIndex === 0 ? "head" : ""} ${index === game.food ? "food" : ""}`} key={index} />;
          })}

          {game.phase === "countdown" && (
            <div className="game-overlay countdown" aria-live="assertive"><small>verified run ready</small><strong>{game.countdown}</strong><span>use arrows or WASD</span></div>
          )}
          {game.phase === "game-over" && (
            <div className="game-overlay game-over" role="alert"><small>session ended</small><strong>GAME OVER</strong><span>score {game.score.toString().padStart(2, "0")}</span><button type="button" onClick={startWithCountdown}>play again</button></div>
          )}
        </div>

        <div className="game-console">
          <p><span>{"//"}</span> arrow keys or WASD to steer</p>
          <p><span>{"//"}</span> collect the orb · avoid walls and your trail</p>
          <div className="game-stats"><span>score <b>{game.score.toString().padStart(2, "0")}</b></span><span>state <b>{isStarting ? "syncing" : game.phase}</b></span><span>speed <b>{Math.round(initialSpeed / speed * 10) / 10}×</b></span></div>
          <div className="game-controls" aria-label="Direction controls">
            <button type="button" aria-label="Move up" onClick={() => handleControl(-columns)}>↑</button>
            <button type="button" aria-label="Move left" onClick={() => handleControl(-1)}>←</button>
            <button type="button" aria-label="Move down" onClick={() => handleControl(columns)}>↓</button>
            <button type="button" aria-label="Move right" onClick={() => handleControl(1)}>→</button>
          </div>
          <button className="button button-primary" type="button" onClick={startWithCountdown} disabled={isStarting || game.phase === "running" || game.phase === "countdown"}>
            {isStarting ? "preparing verified run" : game.phase === "countdown" ? `starting in ${game.countdown}` : game.phase === "running" ? "use controls" : game.phase === "game-over" ? "restart game" : "start game"}
          </button>
          <button className="button button-ghost game-leaderboard-button" type="button" onClick={openLeaderboard} disabled={isStarting || game.phase === "running" || game.phase === "countdown"}>view top 10 ↗</button>
          {leaderboardMessage && leaderboardView === "closed" && <p className="game-service-note">{leaderboardMessage}</p>}
        </div>
      </div>

      {leaderboardView !== "closed" && (
        <div className="leaderboard-modal" role="presentation">
          <div className="leaderboard-panel" role="dialog" aria-modal="true" aria-labelledby="leaderboard-title">
            <div className="leaderboard-header">
              <div><small>nomo snake arena</small><h3 id="leaderboard-title">{leaderboardView === "name" ? "You made the top 10" : "Global leaderboard"}</h3></div>
              <button type="button" aria-label="Close leaderboard" onClick={() => setLeaderboardView("closed")}>×</button>
            </div>

            {leaderboardView === "name" ? (
              <form className="leaderboard-name-form" onSubmit={submitScore}>
                <p>Your verified score of <strong>{game.score}</strong> qualifies. Enter your name to save this run.</p>
                <label htmlFor="snake-player-name">player_name</label>
                <input id="snake-player-name" value={playerName} onChange={(event) => setPlayerName(event.target.value)} minLength={2} maxLength={20} pattern="[A-Za-zÀ-ỹ0-9 ._-]{2,20}" autoComplete="nickname" required placeholder="Nomo" />
                <button className="button button-primary" type="submit" disabled={leaderboardStatus === "saving"}>{leaderboardStatus === "saving" ? "verifying replay..." : "save verified score →"}</button>
                <button className="leaderboard-skip" type="button" onClick={() => setLeaderboardView("closed")}>skip this time</button>
              </form>
            ) : (
              <div className="leaderboard-list">
                <div className="leaderboard-columns"><span>rank / player</span><span>score</span></div>
                {leaderboardStatus === "loading" && <p className="leaderboard-empty">Loading verified scores...</p>}
                {leaderboardStatus !== "loading" && leaderboard.length === 0 && <p className="leaderboard-empty">No verified scores yet. Be the first.</p>}
                {leaderboard.map((entry) => (
                  <div className="leaderboard-row" key={`${entry.name}-${entry.rank}`}>
                    <span><b>{entry.rank.toString().padStart(2, "0")}</b><em>{entry.name}</em></span>
                    <strong>{entry.score.toString().padStart(2, "0")}</strong>
                  </div>
                ))}
              </div>
            )}

            {leaderboardMessage && <p className={`leaderboard-message ${leaderboardStatus}`}>{leaderboardMessage}</p>}
            <div className="leaderboard-footer"><span>✓ replay verified</span><span>top 10 worldwide</span></div>
          </div>
        </div>
      )}
    </section>
  );
}
