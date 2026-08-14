"use client";

import { useEffect, useState } from "react";

const careerStartedAt = new Date("2023-08-01T00:00:00+07:00");

type Runtime = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyRuntime: Runtime = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

function careerRuntime(now: Date): Runtime {
  if (now <= careerStartedAt) return emptyRuntime;

  let years = now.getFullYear() - careerStartedAt.getFullYear();
  let anchor = new Date(careerStartedAt);
  anchor.setFullYear(careerStartedAt.getFullYear() + years);
  if (anchor > now) {
    years -= 1;
    anchor = new Date(careerStartedAt);
    anchor.setFullYear(careerStartedAt.getFullYear() + years);
  }

  let months = (now.getFullYear() - anchor.getFullYear()) * 12 + now.getMonth() - anchor.getMonth();
  let monthAnchor = new Date(anchor);
  monthAnchor.setMonth(anchor.getMonth() + months);
  if (monthAnchor > now) {
    months -= 1;
    monthAnchor = new Date(anchor);
    monthAnchor.setMonth(anchor.getMonth() + months);
  }

  let remaining = Math.max(0, now.getTime() - monthAnchor.getTime());
  const days = Math.floor(remaining / 86_400_000);
  remaining -= days * 86_400_000;
  const hours = Math.floor(remaining / 3_600_000);
  remaining -= hours * 3_600_000;
  const minutes = Math.floor(remaining / 60_000);
  remaining -= minutes * 60_000;
  const seconds = Math.floor(remaining / 1_000);

  return { years, months, days, hours, minutes, seconds };
}

const runtimeLabels: Array<[keyof Runtime, string]> = [
  ["years", "years"],
  ["months", "months"],
  ["days", "days"],
  ["hours", "hours"],
  ["minutes", "minutes"],
  ["seconds", "seconds"],
];

export default function ExperienceTimer() {
  const [runtime, setRuntime] = useState<Runtime>(emptyRuntime);

  useEffect(() => {
    const update = () => setRuntime(careerRuntime(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="experience-runtime" aria-label="Live professional experience timer">
      <div className="window-bar">
        <div className="window-dots"><i /><i /><i /></div>
        <span>career.runtime</span>
        <span className="window-status">● live</span>
      </div>
      <div className="runtime-body">
        <div className="runtime-copy">
          <p><span>{"//"}</span> professional experience</p>
          <h3>Building products<br /><em>since Aug 2023.</em></h3>
          <small>The counter keeps running with every interface, system, and product shipped.</small>
        </div>
        <div className="runtime-clock" role="timer" aria-live="off">
          {runtimeLabels.map(([key, label]) => (
            <div key={key}>
              <strong>{String(runtime[key]).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="runtime-status"><span>● career process active</span><span>GMT+7 · Vietnam</span></div>
    </section>
  );
}
