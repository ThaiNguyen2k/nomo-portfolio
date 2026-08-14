"use client";

import { useEffect, useState } from "react";

const rows = 10;
const columns = 12;
const snakePath = [97, 98, 99, 87, 75, 63, 51, 52, 53, 54, 42, 30, 31, 32, 44, 56, 68, 69, 70, 71, 59, 47];

export default function TerminalGame() {
  const [phase, setPhase] = useState<"ready" | "running" | "complete">("ready");
  const [step, setStep] = useState(6);

  useEffect(() => {
    if (phase !== "running") return;
    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= snakePath.length) {
          setPhase("complete");
          return current;
        }
        return current + 1;
      });
    }, 115);
    return () => window.clearInterval(timer);
  }, [phase]);

  const start = () => {
    setStep(6);
    setPhase("running");
  };

  const visibleSnake = snakePath.slice(0, step);

  return (
    <section className="section-shell terminal-game" aria-label="Interactive terminal mini game">
      <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>nomo-lab.game</span><span className="window-status">interactive</span></div>
      <div className="game-body">
        <div className="game-board" style={{ "--game-columns": columns } as React.CSSProperties}>
          {Array.from({ length: rows * columns }, (_, index) => {
            const activeIndex = visibleSnake.indexOf(index);
            const isHead = activeIndex === visibleSnake.length - 1;
            return <i className={`${activeIndex >= 0 ? "snake" : ""} ${isHead ? "head" : ""} ${index === 34 ? "food" : ""}`} key={index} />;
          })}
        </div>
        <div className="game-console">
          <p><span>{"//"}</span> use the button to run</p>
          <p><span>{"//"}</span> deterministic UI sequence</p>
          <div className="game-stats"><span>score <b>{Math.max(0, step - 6).toString().padStart(2, "0")}</b></span><span>state <b>{phase}</b></span></div>
          <button className="button button-primary" type="button" onClick={start} disabled={phase === "running"}>
            {phase === "running" ? "running..." : phase === "complete" ? "play again" : "start game"}
          </button>
        </div>
      </div>
    </section>
  );
}
