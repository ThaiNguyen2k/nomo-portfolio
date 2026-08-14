"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const rows = 10;
const columns = 12;
const totalCells = rows * columns;
const initialSnake = [66, 65, 64];
const initialFood = 34;

type Direction = -12 | -1 | 1 | 12;
type Phase = "ready" | "running" | "game-over";
type GameState = { phase: Phase; snake: number[]; food: number; score: number };

const initialGame: GameState = { phase: "ready", snake: initialSnake, food: initialFood, score: 0 };

function nextFood(snake: number[], currentFood: number) {
  for (let offset = 17; offset < totalCells + 17; offset += 1) {
    const candidate = (currentFood + offset * 7) % totalCells;
    if (!snake.includes(candidate)) return candidate;
  }
  return currentFood;
}

export default function TerminalGame() {
  const [game, setGame] = useState<GameState>(initialGame);
  const direction = useRef<Direction>(1);
  const queuedDirection = useRef<Direction>(1);

  const turn = useCallback((nextDirection: Direction) => {
    if (game.phase !== "running" || nextDirection + direction.current === 0) return;
    queuedDirection.current = nextDirection;
  }, [game.phase]);

  useEffect(() => {
    if (game.phase !== "running") return;

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
      turn(nextDirection);
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [game.phase, turn]);

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
          phase: "running",
          snake,
          food: ateFood ? nextFood(snake, current.food) : current.food,
          score: current.score + (ateFood ? 1 : 0),
        };
      });
    }, 155);

    return () => window.clearInterval(timer);
  }, [game.phase]);

  const start = () => {
    direction.current = 1;
    queuedDirection.current = 1;
    setGame({ phase: "running", snake: initialSnake, food: initialFood, score: 0 });
  };

  return (
    <section className="section-shell terminal-game" aria-label="Interactive snake mini game">
      <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>nomo-lab.game</span><span className="window-status">interactive</span></div>
      <div className="game-body">
        <div className="game-board" style={{ "--game-columns": columns } as React.CSSProperties} aria-label="Snake game board">
          {Array.from({ length: totalCells }, (_, index) => {
            const snakeIndex = game.snake.indexOf(index);
            return <i className={`${snakeIndex >= 0 ? "snake" : ""} ${snakeIndex === 0 ? "head" : ""} ${index === game.food ? "food" : ""}`} key={index} />;
          })}
        </div>
        <div className="game-console">
          <p><span>{"//"}</span> arrow keys or WASD to steer</p>
          <p><span>{"//"}</span> eat orange nodes, avoid walls</p>
          <div className="game-stats"><span>score <b>{game.score.toString().padStart(2, "0")}</b></span><span>state <b>{game.phase}</b></span></div>
          <div className="game-controls" aria-label="Direction controls">
            <button type="button" aria-label="Move up" onClick={() => turn(-columns)} disabled={game.phase !== "running"}>↑</button>
            <button type="button" aria-label="Move left" onClick={() => turn(-1)} disabled={game.phase !== "running"}>←</button>
            <button type="button" aria-label="Move down" onClick={() => turn(columns)} disabled={game.phase !== "running"}>↓</button>
            <button type="button" aria-label="Move right" onClick={() => turn(1)} disabled={game.phase !== "running"}>→</button>
          </div>
          <button className="button button-primary" type="button" onClick={start} disabled={game.phase === "running"}>
            {game.phase === "running" ? "use controls" : game.phase === "game-over" ? "play again" : "start game"}
          </button>
        </div>
      </div>
    </section>
  );
}
