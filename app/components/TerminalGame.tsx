"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const rows = 10;
const columns = 12;
const totalCells = rows * columns;
const initialSpeed = 340;
const minimumSpeed = 180;
const pointsPerSpeedLevel = 5;
const speedStep = 18;
const defaultDirection: Direction = 1;

type Direction = -12 | -1 | 1 | 12;
type Phase = "ready" | "countdown" | "running" | "game-over";
type GameState = { phase: Phase; snake: number[]; food: number; score: number; countdown: number };

function startingSnake(nextDirection: Direction) {
  const head = 65;
  if (nextDirection === 1) return [head, head - 1, head - 2];
  if (nextDirection === -1) return [head, head + 1, head + 2];
  if (nextDirection === columns) return [head, head - columns, head - columns * 2];
  return [head, head + columns, head + columns * 2];
}

function randomFood(snake: number[]) {
  const availableCells = Array.from({ length: totalCells }, (_, index) => index).filter((index) => !snake.includes(index));
  return availableCells[Math.floor(Math.random() * availableCells.length)] ?? -1;
}

const initialSnake = startingSnake(defaultDirection);
const initialGame: GameState = { phase: "ready", snake: initialSnake, food: 34, score: 0, countdown: 0 };

export default function TerminalGame() {
  const [game, setGame] = useState<GameState>(initialGame);
  const direction = useRef<Direction>(defaultDirection);
  const queuedDirection = useRef<Direction>(defaultDirection);
  const speedLevel = Math.floor(game.score / pointsPerSpeedLevel);
  const speed = Math.max(minimumSpeed, initialSpeed - speedLevel * speedStep);

  const turn = useCallback((nextDirection: Direction) => {
    if (nextDirection + direction.current === 0) return;
    queuedDirection.current = nextDirection;
  }, []);

  const resetGame = useCallback((nextDirection: Direction, phase: Phase) => {
    const snake = startingSnake(nextDirection);
    direction.current = nextDirection;
    queuedDirection.current = nextDirection;
    setGame({ phase, snake, food: randomFood(snake), score: 0, countdown: phase === "countdown" ? 3 : 0 });
  }, []);

  const startWithCountdown = useCallback(() => {
    resetGame(defaultDirection, "countdown");
  }, [resetGame]);

  const handleControl = useCallback((nextDirection: Direction) => {
    if (game.phase === "ready" || game.phase === "game-over") {
      resetGame(nextDirection, "running");
      return;
    }

    if (game.phase === "countdown") {
      const snake = startingSnake(nextDirection);
      direction.current = nextDirection;
      queuedDirection.current = nextDirection;
      setGame((current) => ({ ...current, snake, food: randomFood(snake) }));
      return;
    }

    turn(nextDirection);
  }, [game.phase, resetGame, turn]);

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
        ArrowUp: -columns,
        w: -columns,
        W: -columns,
        ArrowRight: 1,
        d: 1,
        D: 1,
        ArrowDown: columns,
        s: columns,
        S: columns,
        ArrowLeft: -1,
        a: -1,
        A: -1,
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
      setGame((current) => {
        if (current.phase !== "running") return current;

        const nextDirection = queuedDirection.current;
        direction.current = nextDirection;
        const head = current.snake[0];
        const headRow = Math.floor(head / columns);
        const headColumn = head % columns;
        const nextRow = headRow + (nextDirection === columns ? 1 : nextDirection === -columns ? -1 : 0);
        const nextColumn = headColumn + (nextDirection === 1 ? 1 : nextDirection === -1 ? -1 : 0);

        if (nextRow < 0 || nextRow >= rows || nextColumn < 0 || nextColumn >= columns) {
          return { ...current, phase: "game-over" };
        }

        const nextHead = nextRow * columns + nextColumn;
        const ateFood = nextHead === current.food;
        const collisionBody = ateFood ? current.snake : current.snake.slice(0, -1);
        if (collisionBody.includes(nextHead)) return { ...current, phase: "game-over" };

        const snake = ateFood
          ? [nextHead, ...current.snake]
          : [nextHead, ...current.snake.slice(0, -1)];

        return {
          ...current,
          snake,
          food: ateFood ? randomFood(snake) : current.food,
          score: current.score + (ateFood ? 1 : 0),
        };
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [game.phase, speed]);

  return (
    <section className="section-shell terminal-game" aria-label="Interactive snake mini game">
      <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>nomo-lab.game</span><span className="window-status">interactive</span></div>
      <div className="game-body">
        <div className="game-board" style={{ "--game-columns": columns } as React.CSSProperties} aria-label="Snake game board">
          {Array.from({ length: totalCells }, (_, index) => {
            const snakeIndex = game.snake.indexOf(index);
            const snakeHue = 165 + (snakeIndex / Math.max(1, game.snake.length - 1)) * 105;
            const segmentStyle = snakeIndex >= 0 ? { "--snake-hue": snakeHue } as React.CSSProperties : undefined;
            return <i style={segmentStyle} className={`${snakeIndex >= 0 ? "snake" : ""} ${snakeIndex === 0 ? "head" : ""} ${index === game.food ? "food" : ""}`} key={index} />;
          })}

          {game.phase === "countdown" && (
            <div className="game-overlay countdown" aria-live="assertive"><small>get ready</small><strong>{game.countdown}</strong><span>use arrows or WASD</span></div>
          )}

          {game.phase === "game-over" && (
            <div className="game-overlay game-over" role="alert"><small>session ended</small><strong>GAME OVER</strong><span>score {game.score.toString().padStart(2, "0")}</span><button type="button" onClick={startWithCountdown}>play again</button></div>
          )}
        </div>
        <div className="game-console">
          <p><span>{"//"}</span> arrow keys or WASD to steer</p>
          <p><span>{"//"}</span> random nodes · speed up every 05 points</p>
          <div className="game-stats"><span>score <b>{game.score.toString().padStart(2, "0")}</b></span><span>state <b>{game.phase}</b></span><span>speed <b>{Math.round(initialSpeed / speed * 10) / 10}×</b></span></div>
          <div className="game-controls" aria-label="Direction controls">
            <button type="button" aria-label="Move up" onClick={() => handleControl(-columns)}>↑</button>
            <button type="button" aria-label="Move left" onClick={() => handleControl(-1)}>←</button>
            <button type="button" aria-label="Move down" onClick={() => handleControl(columns)}>↓</button>
            <button type="button" aria-label="Move right" onClick={() => handleControl(1)}>→</button>
          </div>
          <button className="button button-primary" type="button" onClick={startWithCountdown} disabled={game.phase === "running" || game.phase === "countdown"}>
            {game.phase === "countdown" ? `starting in ${game.countdown}` : game.phase === "running" ? "use controls" : game.phase === "game-over" ? "restart game" : "start game"}
          </button>
        </div>
      </div>
    </section>
  );
}
